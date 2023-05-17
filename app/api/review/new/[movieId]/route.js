import prisma from "@/prisma/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
    const session = await getServerSession(authOptions);
    const req = await request.json();
    const { body, rating } = req;
    if (session && session.user.role === "reviewer") {
        const movieBoard = await prisma.MovieBoard.findUnique({
            where: {
                tmdb_id: params.movieId,
            },
        });

        if (!movieBoard) {
            const mb = await prisma.MovieBoard.create({
                data: {
                    tmdb_id: params.movieId,
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
        if (body.length < 1 || body.length > 280 || rating <=0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Review body must be between 1 and 280 characters long, rating must be > 0",
                },
                {
                    status: 500,
                }
            );
        }
        const review = await prisma.Review.create({
            data: {
                body: body,
                rating: rating,
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
