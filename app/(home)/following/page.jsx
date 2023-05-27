import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import MovieGrid from "@/components/movies/MovieGrid";
import { getFollowing, createFollowingMovieList } from "@/components/utils";

export default async function HomeFollowing() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return <h1>Please Login</h1>;
    }

    if (session.user.role !== "reviewer") {
        return <h1>Unauthorized, reviewers only</h1>;
    }
    const userId = session.user.id;

    const following = await getFollowing(userId);
    const movieList = await createFollowingMovieList(following);

    return <MovieGrid movies={movieList} />;
}
