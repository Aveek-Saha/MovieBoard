"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Follow({ movieId, followers }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    const toggleFollowMovieBoard = async (movieId) => {
        const res = await fetch(`/api/follow/${movieId}`, {
            method: "PUT",
        });
        router.refresh();
    };
    const following = followers.find((el) => el.userId === session?.user?.id);

    return (
        <>
            {following && (
                <button
                    onClick={(e) => toggleFollowMovieBoard(movieId)}
                    className="btn btn-outline-danger m-2"
                >
                    UnFollow
                </button>
            )}
            {!following && (
                <button
                    onClick={(e) => toggleFollowMovieBoard(movieId)}
                    className="btn btn-outline-primary m-2"
                >
                    Follow
                </button>
            )}
        </>
    );
}
