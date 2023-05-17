import prisma from "@/prisma/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const session = await getServerSession(authOptions);
    const reviewId = params.reviewId;
    if (session && session.user.role === "reviewer") {
        const review = await prisma.Review.findUnique({
            where: {
                id: reviewId,
            },
            include: {
                likedBy: true,
            },
        });
        if (review) {
            const liked = review.likedBy.find(
                (el) => el.userId === session?.user?.id
            );

            if (!liked) {
                const like = await prisma.Review.update({
                    where: {
                        id: reviewId,
                    },
                    data: {
                        likedBy: { connect: { userId: session?.user?.id } },
                    },
                });
                return NextResponse.json(like);
            }
            const dislike = await prisma.Review.update({
                where: {
                    id: reviewId,
                },
                data: {
                    likedBy: { disconnect: { userId: session?.user?.id } },
                },
            });

            return NextResponse.json(dislike);
        }
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
