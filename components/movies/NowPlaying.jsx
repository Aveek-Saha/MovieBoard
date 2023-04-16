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
            <h1>Now Playing</h1>
            <div className="row row-cols-lg-5 row-cols-sm-2 row-cols-md-4 row-cols-xs-1 g-4">
                {movies?.map((movie) => {
                    return <MovieCard key={movie.id} movie={movie} />;
                })}
            </div>
        </>
    );
}
