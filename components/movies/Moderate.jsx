"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Moderate({ movieId, moderators }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    const toggleModerateMovieBoard = async (movieId) => {
        const res = await fetch(`/api/moderate/${movieId}`, {
            method: "PUT",
        });
        router.refresh();
    };
    const following = moderators.find((el) => el.userId === session?.user?.id);

    return (
        <>
            {following && (
                <button
                    onClick={(e) => toggleModerateMovieBoard(movieId)}
                    className="btn btn-outline-danger mt-2 mb-2"
                >
                    Remove as Mod
                </button>
            )}
            {!following && (
                <button
                    onClick={(e) => toggleModerateMovieBoard(movieId)}
                    className="btn btn-outline-primary mt-2 mb-2"
                >
                    Moderate Board
                </button>
            )}
        </>
    );
}
