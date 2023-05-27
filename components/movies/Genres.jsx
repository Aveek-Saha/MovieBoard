import { getGenres } from "../utils";

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
