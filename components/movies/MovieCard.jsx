import Genres from "./Genres";

export default function MovieCard({ movie }) {
    const imgUrl = `https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`;
    return (
        <div className="col mb-3 text-center">
            <div className="card h-100">
                <img src={imgUrl} className="card-img-top" alt="..."></img>
                <div className="card-body">
                    <h5 className="card-title m-2 text-truncate">
                        {movie.original_title}
                    </h5>
                    <p className="card-text">
                        <Genres genre_ids={movie.genre_ids} />
                    </p>
                </div>
            </div>
        </div>
    );
}
