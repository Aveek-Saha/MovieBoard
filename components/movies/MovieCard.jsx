import Link from "next/link";
import Vibrant from "node-vibrant";
import Genres from "./Genres";

export default async function MovieCard({ movie }) {
    const imgUrl = `https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`;
    const palette = await Vibrant.from(imgUrl).getPalette();
    return (
        <div className="col mb-3 text-center">
            <div
                className="card card_list h-100"
                style={{ backgroundColor: palette.DarkVibrant.hex }}
            >
                <Link
                    href={`/movie/${movie.id}`}
                    style={{
                        textDecoration: "none",
                        padding: 0,
                        color: "inherit",
                    }}
                >
                    <img src={imgUrl} className="card-img-top" alt="..."></img>
                    <div className="card-body card-body_list">
                        <h5 className="card-title m-2 text-truncate">
                            {movie.title}
                        </h5>
                        <p className="card-text">
                            <Genres
                                genre_ids={movie.genre_ids}
                                background={palette.Muted.hex}
                            />
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
