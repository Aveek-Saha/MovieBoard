import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import prisma from "@/prisma/prisma";

import NavSidebar from "@/components/profile/NavSidebar";
import Review from "@/components/reviews/Review";

async function getReviews(userId) {
    const reviews = await prisma.Review.findMany({
        where: {
            userId: userId,
        },
        include: {
            user: {
                select: {
                    user: true,
                },
            },
            likedBy: true,

            _count: {
                select: { likedBy: true },
            },
        },
        orderBy: {
            created_on: "desc",
        },
    });
    return reviews;
}

export default async function Reviews({ params }) {
    const session = await getServerSession(authOptions);
    const userId = params.userId;

    const reviews = await getReviews(userId);
    return (
        <div className="row">
            <div className="col-1"></div>
            <div className="col-2">
                <NavSidebar userId={userId} />
            </div>
            <div className="col-6">
                <div className="list-group list-group-flush mb-3">
                    {reviews?.map((review) => {
                        return <Review key={review.id} review={review} />;
                    })}
                </div>
            </div>
        </div>
    );
}
