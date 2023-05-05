"use client";

import { useSession } from "next-auth/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartReg } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/navigation";

export default function Like({ review }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    const toggleLike = async (reviewId) => {
        if (session) {
            const res = await fetch(`/api/review/${reviewId}/like`, {
                method: "PUT",
            });
            router.refresh();
        } else {
            router.push("/login");
        }
    };
    const liked = review.likedBy.find((el) => el.userId === session?.user?.id);

    return (
        <button
            onClick={(e) => toggleLike(review.id)}
            className="btn btn-link text-muted text-decoration-none"
        >
            {liked && (
                <FontAwesomeIcon
                    icon={faHeartSolid}
                    style={{ color: "#ee1d52" }}
                />
            )}
            {!liked && <FontAwesomeIcon icon={faHeartReg} />}
            <span> {review._count.likedBy}</span>
        </button>
    );
}
