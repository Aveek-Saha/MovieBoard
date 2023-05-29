"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarFill } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

export default function CreateReview({ tmdb_id }) {
    const [body, setBody] = useState("");
    const router = useRouter();

    const create = async (e) => {
        e.preventDefault();
        if (body.length >= 1 && rating > 0) {
            const res = await fetch(`/api/review/new/${tmdb_id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    body,
                    rating,
                }),
            });

            setBody("");

            router.push(`/review/${tmdb_id}`);
        }
    };
    const [rating, setRating] = useState(0);
    const [tempRating, setTempRating] = useState(rating);
    const [hover, setHover] = useState(0);
    return (
        <div className="col-12 col-sm-12 col-md-8 col-lg-6">
            <form onSubmit={(e) => create(e)}>
                <h2>New Review</h2>
                <div className="star-rating mt-3 mb-3">
                    {[...Array(10)].map((star, index) => {
                        index += 1;
                        return (
                            <span
                                key={index}
                                onClick={() => setRating(index)}
                                onMouseEnter={() => {
                                    setHover(index);
                                    setTempRating(index);
                                }}
                                onMouseLeave={() => {
                                    setHover(rating);
                                    setTempRating(rating);
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={
                                        index <= (hover || rating)
                                            ? faStarFill
                                            : faStarEmpty
                                    }
                                    className="me-1"
                                />
                            </span>
                        );
                    })}
                    <span
                        className={`badge text-bg-${
                            tempRating > 6
                                ? "success"
                                : tempRating > 4
                                ? "secondary"
                                : "danger"
                        }`}
                    >
                        {tempRating}
                    </span>
                    <span
                        className={`ms-3 text-muted ${
                            rating > 0 ? "d-none" : ""
                        }`}
                    >
                        Star rating required
                    </span>
                </div>
                <div className="mb-3">
                    <span className="float-end mb-1">
                        <span
                            className={`badge text-bg-${
                                body.length < 250
                                    ? "success"
                                    : body.length < 270
                                    ? "warning"
                                    : "danger"
                            }`}
                        >
                            {body.length} / 280
                        </span>
                    </span>
                    <textarea
                        className="form-control search"
                        placeholder="Type your review here. Review body is required."
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        maxLength="280"
                        rows={7}
                    />
                </div>
                <button
                    className="btn btn-outline-danger m-2"
                    onClick={(e) => {
                        e.preventDefault();
                        router.push(`/review/${tmdb_id}`);
                    }}
                >
                    Back
                </button>
                <button
                    type="submit"
                    className="btn btn-outline-success m-2"
                    disabled={body.length < 1 || rating <= 0}
                >
                    Create Review
                </button>
            </form>
        </div>
    );
}
