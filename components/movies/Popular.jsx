import MovieGrid from "./MovieGrid";

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
            <MovieGrid movies={movies} />
        </>
    );
}
