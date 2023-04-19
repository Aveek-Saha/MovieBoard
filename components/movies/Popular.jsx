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
            <h1 className="mb-3">Popular</h1>
            <div className="row row-cols-2 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-xs-1 g-4">
                {movies?.map((movie) => {
                    return <MovieCard key={movie.id} movie={movie} />;
                })}
            </div>
        </>
    );
}
