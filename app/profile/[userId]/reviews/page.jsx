import { getReviewsByUser } from "@/components/utils";

import Review from "@/components/reviews/Review";

export default async function Reviews({ params }) {
    const userId = params.userId;

    const reviews = await getReviewsByUser(userId);
    return (
        <div className="list-group list-group-flush mb-3">
            {reviews?.map((review) => {
                return <Review key={review.id} review={review} />;
            })}
        </div>
    );
}
