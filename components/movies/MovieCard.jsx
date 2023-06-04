import Link from "next/link";
import Image from "next/image";
import Vibrant from "node-vibrant";
import Genres from "./Genres";

export default async function MovieCard({ movie }) {
    let imgUrl;
    // if (movie.backdrop_path != null) {
    //     imgUrl = `https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`;
    // } else {
    //     imgUrl = `https://placehold.co/300x169/222222/222222.jpg?text=Poster`;
    // }

    if (movie.poster_path != null) {
        imgUrl = `https://image.tmdb.org/t/p/w342/${movie.poster_path}`;
    } else {
        imgUrl = `https://placehold.co/342x513/222222/222222.jpg?text=Img`;
    }

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
                    <Image
                        src={imgUrl}
                        className="card-img-top img-fluid"
                        alt={movie.title}
                        width={342}
                        height={513}
                    ></Image>
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
