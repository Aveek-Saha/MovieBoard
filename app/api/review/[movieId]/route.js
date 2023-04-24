import prisma from "@/prisma/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
    const session = await getServerSession(authOptions);
    const req = await request.json();
    const { heading, body, rating } = req;
    if (session) {
        const movieBoard = await prisma.MovieBoard.findUnique({
            where: {
                tmdb_id: params.movieId,
            },
        });

        if (!movieBoard) {
            const mb = await prisma.MovieBoard.create({
                data: {
                    tmdb_id: params.movieId,
                    rating: 0,
                },
            });
            if (!mb) {
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
        const review = await prisma.Review.create({
            data: {
                heading: heading,
                body: body,
                rating: rating,
                likes: 0,
                user: { connect: { userId: session?.user?.id } },
                movieBoard: { connect: { tmdb_id: params.movieId } },
            },
        });

        return NextResponse.json(review);
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
