import prisma from "@/prisma/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    const session = await getServerSession(authOptions);
    const req = await request.json();
    const { reviewId } = req;
    if (session) {
        const review = await prisma.Review.findUnique({
            where: {
                id: reviewId,
            },
        });
        if (review && session.user.id === review.userId) {
            const res = await prisma.Review.delete({
                where: {
                    id: reviewId,
                },
            });
        }
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