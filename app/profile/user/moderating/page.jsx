import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import MovieCard from "@/components/movies/MovieCard";

import { getModerating, createModeratingMovieList } from "@/components/utils";

export default async function Page({ params }) {
    const session = await getServerSession(authOptions);
    const userId = params.userId;

    if (session && session.user.role === "moderator") {
        const moderating = await getModerating(userId);
        const movieList = await createModeratingMovieList(moderating);

        return (
            <div className="list-group list-group-flush mb-3">
                <div className="row row-cols-1 row-cols-xl-3 row-cols-lg-2 row-cols-md-1 row-cols-sm-1 row-cols-xs-1 g-3">
                    {movieList?.map((movie) => {
                        return <MovieCard key={movie.id} movie={movie} />;
                    })}
                </div>
            </div>
        );
    }

    return <h2>Unauthorized</h2>
}
