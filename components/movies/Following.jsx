import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import MovieGrid from "./MovieGrid";
import { getFollowing, createFollowingMovieList } from "@/components/utils";

export default async function Following() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return <h1>Please Login</h1>;
    }
    const userId = session.user.id;

    const following = await getFollowing(userId);
    const movieList = await createFollowingMovieList(following);

    return (
        <>
            <h1 className="mb-0">Following</h1>
            <MovieGrid movies={movieList} />
        </>
    );
}