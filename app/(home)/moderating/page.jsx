import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import MovieGrid from "@/components/movies/MovieGrid";
import { getModerating, createModeratingMovieList } from "@/components/utils";

export default async function HomeModerating() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return <h1 className="text-center">Please Login</h1>;
    }
    if (session.user.role !== "moderator") {
        return <h1 className="text-center">Unauthorized access, moderators only</h1>;
    }
    const userId = session.user.id;

    const moderating = await getModerating(userId);
    const movieList = await createModeratingMovieList(moderating);

    return <MovieGrid movies={movieList} />;
}
