"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function DeleteReview({ reviewId, tmdb_id }) {
    const router = useRouter();
    
    const deleteReview = async (reviewId) => {
        const res = await fetch(`/api/review`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                reviewId,
            }),
        });
        router.push(`/review/${tmdb_id}`);
    };
    return (
        <button className="btn btn-link text-muted text-decoration-none float-end p-0">
            <FontAwesomeIcon
                icon={faTrash}
                onClick={() => deleteReview(reviewId)}
            />
        </button>
    );
}
