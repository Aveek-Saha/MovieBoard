import prisma from "@/prisma/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const session = await getServerSession(authOptions);
    if (session && session.user.role === "moderator") {
        let movieBoard = await prisma.MovieBoard.findUnique({
            where: {
                tmdb_id: params.movieId,
            },
            include: {
                moderators: true,
            },
        });

        if (!movieBoard) {
            movieBoard = await prisma.MovieBoard.create({
                data: {
                    tmdb_id: params.movieId,
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
        let moderating = false;
        if (movieBoard.moderators) {
            moderating = movieBoard.moderators.find(
                (el) => el.userId === session?.user?.id
            );
        }

        if (!moderating) {
            const follow = await prisma.MovieBoard.update({
                where: {
                    tmdb_id: params.movieId,
                },
                data: {
                    moderators: { connect: { userId: session?.user?.id } },
                },
            });
            return NextResponse.json(follow);
        }
        const unmod = await prisma.MovieBoard.update({
            where: {
                tmdb_id: params.movieId,
            },
            data: {
                moderators: { disconnect: { userId: session?.user?.id } },
            },
        });

        return NextResponse.json(unmod);
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
