import prisma from "@/prisma/prisma";

import MovieCard from "@/components/movies/MovieCard";

import { getMovie } from "@/components/utils";

async function getFollowing(userId) {
    let following = await prisma.Reviewer.findUnique({
        where: {
            userId: userId,
        },
        include: {
            following: true,
        },
    });
    return following;
}
async function createMovieList(reviewer) {
    let movieList = [];
    for (const movieBoard of reviewer.following) {
        const movie = await getMovie(movieBoard.tmdb_id);
        const genre_ids = movie.genres.map((genre) => {
            return genre.id;
        });
        movieList.push({ ...movie, genre_ids });
    }
    return movieList;
}

export default async function Page({ params }) {
    const userId = params.userId;

    const following = await getFollowing(userId);
    const movieList = await createMovieList(following);

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
