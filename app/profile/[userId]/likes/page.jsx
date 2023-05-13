import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import prisma from "@/prisma/prisma";

import NavSidebar from "@/components/profile/NavSidebar";
import Review from "@/components/reviews/Review";

async function getReviews(userId) {
    let reviews = await prisma.Review.findMany({
        where: {
            likedBy: {
                some: {
                    userId: userId,
                },
            },
        },
        include: {
            user: {
                select: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            image: true,
                            full_name: true,
                            role: true,
                        },
                    },
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
    reviews = reviews.map((review) => {
        return {
            ...review,
            last_modified: review.last_modified.toDateString(),
            created_on: review.created_on.toDateString(),
        };
    });
    return reviews;
}

export default async function Page({params}) {
    const session = await getServerSession(authOptions);
    if (!session || params.userId !== session.user.id) {
        return <h2>Unauthorized</h2>;
    }
    const userId = session.user.id;

    const reviews = await getReviews(userId);
    return (
        <div className="list-group list-group-flush mb-3">
            {reviews?.map((review) => {
                return <Review key={review.id} review={review} />;
            })}
        </div>
    );
}
