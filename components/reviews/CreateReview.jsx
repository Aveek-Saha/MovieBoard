"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateReview({ tmdb_id }) {
    const [heading, setHeading] = useState("");
    const [body, setBody] = useState("");
    const router = useRouter();
    const rating = 8;

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
    return (
        <div className="col-6">
            <form onSubmit={(e) => create(e)}>
                <h3>New Review</h3>
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
