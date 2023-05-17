import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import MovieGrid from "./MovieGrid";
import { getModerating, createModeratingMovieList } from "@/components/utils";

export default async function Moderating() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return <h1>Please Login</h1>;
    }
    const userId = session.user.id;

    const moderating = await getModerating(userId);
    const movieList = await createModeratingMovieList(moderating);

    return (
        <>
            <h1 className="mb-0">Moderating</h1>
            <MovieGrid movies={movieList} />
        </>
    );
}
