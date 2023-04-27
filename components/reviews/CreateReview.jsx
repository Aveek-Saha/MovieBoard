"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarFill } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

export default function CreateReview({ tmdb_id }) {
    const [heading, setHeading] = useState("");
    const [body, setBody] = useState("");
    const router = useRouter();

    const create = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/review/${tmdb_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                heading,
                body,
                rating,
            }),
        });

        setBody("");
        setHeading("");

        router.push(`/review/${tmdb_id}`);
    };
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    return (
        <div className="col-6">
            <form onSubmit={(e) => create(e)}>
                <h2>Movie Name</h2>
                <h5>New Review</h5>
                <div className="star-rating mt-3 mb-3">
                    {[...Array(10)].map((star, index) => {
                        index += 1;
                        return (
                            <span
                                key={index}
                                onClick={() => setRating(index)}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(rating)}
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
                </div>
                <div className="mb-3">
                    <input
                        className="form-control search"
                        type="text"
                        placeholder="Review title"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        className="form-control search"
                        placeholder="Review body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-outline-success">
                    Create Review
                </button>
            </form>
        </div>
    );
}
