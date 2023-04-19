async function getGenres() {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
    const genres = await fetch(url);
    return genres.json();
}

export default async function Genres({ genre_ids, background }) {
    const genre = await getGenres();
    const genreList = genre.genres;
    return (
        <>
            {genre_ids?.map((g) => {
                return (
                    <span
                        key={g}
                        className="badge rounded-pill m-1"
                        style={{ backgroundColor: background }}
                    >
                        {genreList.find((gen) => gen.id === g).name}
                    </span>
                );
            })}
        </>
    );
}
