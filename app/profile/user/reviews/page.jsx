import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { getReviewsByUser } from "@/components/utils";

import Review from "@/components/reviews/Review";

export default async function Reviews() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return <h2>Please Login</h2>;
    }
    const userId = session.user.id;

    const reviews = await getReviewsByUser(userId);
    return (
        <div className="list-group list-group-flush mb-3">
            {reviews?.map((review) => {
                return <Review key={review.id} review={review} />;
            })}
        </div>
    );
}
