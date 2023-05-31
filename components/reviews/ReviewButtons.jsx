import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Link from "next/link";

import Follow from "@/components/movies/Follow";
import Moderate from "@/components/movies/Moderate";

export default async function ReviewButtons({
    movieId,
    followers,
    moderators,
}) {
    const session = await getServerSession(authOptions);

    return (
        <>
            {session?.user.role === "moderator" && (
                <p className="card-text">
                    <Link className="link" href={`/moderators/${movieId}`}>
                        <strong>{moderators.length}</strong> Moderators
                    </Link>
                </p>
            )}
            {session && session.user.role === "reviewer" && (
                <>
                    <Link
                        href={`/review/${movieId}/new`}
                        className="btn btn-outline-success me-2"
                    >
                        +Review
                    </Link>
                    <Follow movieId={movieId} followers={followers} />
                </>
            )}
            {session && session.user.role === "moderator" && (
                <Moderate movieId={movieId} moderators={moderators} />
            )}
            {!session && (
                <Link href={`/login`} className="btn btn-outline-success">
                    Login to review
                </Link>
            )}
        </>
    );
}
