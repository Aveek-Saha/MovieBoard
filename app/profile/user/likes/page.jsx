import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { getReviewsByUserLikes } from "@/components/utils";

import Review from "@/components/reviews/Review";

export default async function Page() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return <h2 className="text-center">Unauthorized access</h2>;
    }
    const userId = session.user.id;

    const reviews = await getReviewsByUserLikes(userId);
    return (
        <div className="list-group list-group-flush mb-3">
            {reviews?.map((review) => {
                return <Review key={review.id} review={review} />;
            })}
        </div>
    );
}
