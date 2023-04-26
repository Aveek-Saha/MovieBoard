import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart as faHeartSolid,
    faBookmark,
    faTrash,
    faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartReg } from "@fortawesome/free-regular-svg-icons";

import DeleteReview from "./DeleteReview";

export default async function Review({ review }) {
    const session = await getServerSession(authOptions);
    return (
        <div className="list-group-item p-3">
            <div className="row">
                <div className="col-1 p-0 ps-2">
                    <img
                        src={`${review.user.user.image}`}
                        className="rounded-circle img-fluid"
                        width="48px"
                        height="48px"
                        alt="avatar"
                    />
                </div>
                <div className="col-11 ps-3">
                    <div className="row">
                        <div className="col-11">
                            <div className="fw-bolder">
                                {review.user.user.name}
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
                                {review.created_on
                                    .toDateString()
                                    .split(" ")
                                    .slice(1)
                                    .join(" ")}
                            </span>
                        </div>
                        <div className="col-1">
                            {session?.user?.id === review.userId && (
                                <DeleteReview
                                    reviewId={review.id}
                                    tmdb_id={review.tmdb_id}
                                />
                            )}
                        </div>
                    </div>
                    {review.body}

                    <div>
                        <button className="btn btn-link text-muted text-decoration-none">
                            <FontAwesomeIcon icon={faHeartReg} />
                            <span> {review.likes}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
