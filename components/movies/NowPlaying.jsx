import MovieGrid from "./MovieGrid";

async function getNowPlaying() {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`;
    const nowPlaying = await fetch(url);
    return nowPlaying.json();
}

export default async function NowPlaying() {
    const nowPlaying = await getNowPlaying();
    const movies = nowPlaying.results;
    return (
        <>
            <h1 className="mb-0">Now Playing</h1>
            <MovieGrid movies={movies} />
        </>
    );
}
