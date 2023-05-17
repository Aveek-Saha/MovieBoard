import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";

import DeleteReview from "./DeleteReview";
import Like from "./Like";

export default async function Review({ review }) {
    const session = await getServerSession(authOptions);
    const { last_modified, created_on, ...review_prop } = review;

    return (
        <div className="list-group-item p-3">
            <div className="row">
                <div className="col-1 p-0 ps-2">
                    <Link
                        href={`/profile/${review.user.user.id}`}
                        className="link_img"
                    >
                        <img
                            src={`${review.user.user.image}`}
                            className="rounded-circle img-fluid"
                            width="48px"
                            height="48px"
                            alt="avatar"
                        />
                    </Link>
                </div>
                <div className="col-11 ps-3">
                    <div className="row">
                        <div className="col-11">
                            <div className="fw-bolder">
                                <Link
                                    href={`/profile/${review.user.user.id}`}
                                    className="link"
                                >
                                    {review.user.user.full_name}
                                </Link>
                                <span
                                    className={`badge text-bg-${
                                        review.rating > 6
                                            ? "success"
                                            : review.rating > 4
                                            ? "secondary"
                                            : "danger"
                                    } ms-2`}
                                >
                                    <FontAwesomeIcon icon={faStar} />{" "}
                                    {review.rating}
                                </span>
                            </div>
                            <span className="text-muted">
                                @{review.user.user.name}
                                {" • "}
                                {review.created_on
                                    .split(" ")
                                    .slice(1)
                                    .join(" ")}
                            </span>
                        </div>
                        <div className="col-1">
                            {(session?.user?.id === review.userId ||
                                session?.user.role === "moderator") && (
                                <DeleteReview
                                    reviewId={review.id}
                                    tmdb_id={review.tmdb_id}
                                />
                            )}
                        </div>
                    </div>
                    {review.body}

                    <div>
                        {session?.user.role === "reviewer" && (
                            <Like review={review_prop} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
