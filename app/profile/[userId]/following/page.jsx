import MovieCard from "@/components/movies/MovieCard";

import { getFollowing, createFollowingMovieList } from "@/components/utils";

export default async function Page({ params }) {
    const userId = params.userId;

    const following = await getFollowing(userId);
    const movieList = await createFollowingMovieList(following);

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
