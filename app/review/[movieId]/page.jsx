import Vibrant from "node-vibrant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";

import StarRating from "@/components/movies/StarRating";
import Review from "@/components/reviews/Review";
import prisma from "@/prisma/prisma";
import { getMovie, toHoursAndMinutes, longDate } from "@/components/utils";

async function getMovieBoard(movieId) {
    const movieBoard = await prisma.MovieBoard.findUnique({
        where: {
            tmdb_id: movieId,
        },
        include: {
            reviews: {
                include: {
                    user: {
                        select: {
                            user: true,
                        },
                    },
                },
            },
            _count: {
                select: { followers: true },
            },
        },
    });
    return movieBoard;
}

async function getAverageScore(movieId) {
    const avgScore = await prisma.Review.aggregate({
        where: {
            tmdb_id: movieId,
        },
        _avg: {
            rating: true,
        },
        _count: {
            rating: true,
        },
    });
    return avgScore;
}

export default async function Page({ params }) {
    const avgScore = await getAverageScore(params.movieId);
    const rating = Math.round(avgScore._avg.rating * 10) / 10;
    const maxRating = 10;
    const numRating = avgScore._count.rating;

    const movieBoard = await getMovieBoard(params.movieId);
    let numFollowers = 0;
    if (movieBoard) {
        numFollowers = movieBoard._count.followers;
    }

    const movie = await getMovie(params.movieId);

    let imgUrl;
    if (movie.poster_path != null) {
        imgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    } else {
        imgUrl = `https://placehold.co/500x714/222222/222222.jpg?text=Img`;
    }
    const palette = await Vibrant.from(imgUrl).getPalette();

    return (
        <>
            <div className="row">
                <div className="col-3 text-center">
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
                </div>
                <div className="col-6">
                    <h1>Reviews</h1>
                    <div className="list-group list-group-flush mb-3">
                        {movieBoard?.reviews?.map((review) => {
                            return <Review key={review.id} review={review} />;
                        })}
                    </div>
                </div>
                <div className="col-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Average Rating</h5>
                            <h6 className="card-subtitle mt-2 mb-2">
                                <StarRating
                                    ratingNumber={rating}
                                    maxRating={maxRating}
                                    numStars={10}
                                />
                            </h6>
                            <p className="card-text">
                                <strong>{rating}</strong> from{" "}
                                <strong>{numRating}</strong> reviews
                            </p>
                            <p className="card-text">
                                <strong>{numFollowers}</strong> Followers
                            </p>
                            <a
                                href={`/review/${params.movieId}/new`}
                                className="btn btn-outline-success m-2"
                            >
                                Write Review
                            </a>

                            <a
                                href={`#`}
                                className="btn btn-outline-primary m-2"
                            >
                                Follow
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
