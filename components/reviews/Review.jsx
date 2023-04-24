import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Review({ review }) {
    const session = await getServerSession(authOptions);
    return (
        <div className="card mb-2">
            <div className="card-body">
                <h5 className="card-title">{review.heading}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                    {review.user.user.name}
                </h6>
                <span className="badge rounded-pill text-bg-secondary fw-normal">
                    {review.created_on
                        .toDateString()
                        .split(" ")
                        .slice(1)
                        .join(" ")}
                </span>
                <p className="card-text">Rating {review.rating}</p>
                <p className="card-text">Likes {review.likes}</p>
                {review.user.user.id === session?.user?.id && (
                    <p className="card-text">Delete</p>
                )}
                <p className="card-text">{review.body}</p>
            </div>
        </div>
    );
}
