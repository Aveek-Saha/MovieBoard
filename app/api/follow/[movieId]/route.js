import prisma from "@/prisma/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const session = await getServerSession(authOptions);
    if (session) {
        let movieBoard = await prisma.MovieBoard.findUnique({
            where: {
                tmdb_id: params.movieId,
            },
            include: {
                followers: true,
            },
        });

        if (!movieBoard) {
            movieBoard = await prisma.MovieBoard.create({
                data: {
                    tmdb_id: params.movieId,
                    rating: 0,
                },
            });
            if (!movieBoard) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Could not create MovieBoard",
                    },
                    {
                        status: 500,
                    }
                );
            }
        }
        const following = movieBoard.followers.find(
            (el) => el.userId === session?.user?.id
        );
        
        if (!following) {
            const follow = await prisma.MovieBoard.update({
                where: {
                    tmdb_id: params.movieId,
                },
                data: {
                    followers: { connect: { userId: session?.user?.id } },
                },
            });
            return NextResponse.json(follow);
        }
        const unfollow = await prisma.MovieBoard.update({
            where: {
                tmdb_id: params.movieId,
            },
            data: {
                followers: { disconnect: { userId: session?.user?.id } },
            },
        });

        return NextResponse.json(unfollow);
    }
    return NextResponse.json(
        {
            success: false,
            message: "Auth failed",
        },
        {
            status: 401,
        }
    );
}
