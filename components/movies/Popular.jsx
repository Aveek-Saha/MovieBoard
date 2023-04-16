import MovieCard from "./MovieCard";

async function getPopular() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`;
    const popular = await fetch(url);
    return popular.json();
}

export default async function Popular() {
    const popular = await getPopular();
    const movies = popular.results;
    return (
        <>
            <h1>Popular</h1>
            <div className="row row-cols-lg-5 row-cols-sm-2 row-cols-md-4 row-cols-xs-1">
                {movies?.map((movie) => {
                    return <MovieCard key={movie.id} movie={movie} />;
                })}
            </div>
        </>
    );
}
