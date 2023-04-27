import Vibrant from "node-vibrant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";

import { getMovie, toHoursAndMinutes, longDate } from "@/components/utils";

export default async function MovieSidebar({ movieId }) {
    const movie = await getMovie(movieId);

    let imgUrl;
    if (movie.poster_path != null) {
        imgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    } else {
        imgUrl = `https://placehold.co/500x714/222222/222222.jpg?text=Img`;
    }
    const palette = await Vibrant.from(imgUrl).getPalette();

    return (
        <>
            <img src={imgUrl} className="img-fluid w-75" alt="..." />
            <h1 className="card-title">{movie.title}</h1>
            <h6 className="card-subtitle mb-2 mt-3">
                {movie.genres?.map((g) => {
                    return (
                        <span
                            key={g.id}
                            className="badge rounded-pill me-1"
                            style={{
                                backgroundColor: palette.Muted.hex,
                            }}
                        >
                            {g.name}
                        </span>
                    );
                })}
            </h6>
            <p className="card-text">
                <span className="text-body-secondary">
                    <FontAwesomeIcon icon={faCalendar} />{" "}
                    {longDate(movie.release_date)}
                    &nbsp;&nbsp;•&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faClock} />{" "}
                    {toHoursAndMinutes(movie.runtime)}
                </span>
            </p>
        </>
    );
}
