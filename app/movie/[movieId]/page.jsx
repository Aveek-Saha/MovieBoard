import Vibrant from "node-vibrant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";

async function getMovie(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
    const movie = await fetch(url);
    return movie.json();
}

function toHoursAndMinutes(totalMinutes) {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${hours}h ${minutes}m`;
}

function longDate(isoDate) {
    const date = new Date(isoDate);
    return date.toDateString().split(" ").slice(1).join(" ");
}

export default async function Page({ params }) {
    const movie = await getMovie(params.movieId);
    const imgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    const backgroundUrl = `https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`;
    const palette = await Vibrant.from(imgUrl).getPalette();
    return (
        <div className="card card_movie mb-3">
            <div className="row g-0">
                <div className="col-3">
                    <img src={imgUrl} className="img-fluid" alt="..." />
                </div>
                <div className="col-7 ms-4">
                    <div className="card-body">
                        <h1 className="card-title">{movie.title}</h1>
                        <h5 className="card-subtitle mb-2 text-body-secondary text-muted">
                            {movie.tagline}
                        </h5>
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
                        <p className="card-text">
                            <h4>Overview</h4>
                            {movie.overview}</p>
                        <a href="#" className="btn btn-dark">
                            Show reviews
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
