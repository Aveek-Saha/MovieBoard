import MovieCard from "./MovieCard";

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
            <div className="row row-cols-2 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-xs-1 g-4">
                {movies?.map((movie) => {
                    return <MovieCard key={movie.id} movie={movie} />;
                })}
            </div>
        </>
    );
}
