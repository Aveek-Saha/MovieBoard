import MovieDetails from "@/components/movies/MovieDetails";
import StarRating from "@/components/movies/StarRating";
import Review from "@/components/reviews/Review";

import prisma from "@/prisma/prisma";

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
        },
    });
    return movieBoard;
}

export default async function Page({ params }) {
    const rating = 7.5;
    const maxRating = 10;
    const numRating = 20;
    const numFollowers = 2000;

    const movieBoard = await getMovieBoard(params.movieId);

    return (
        <>
            <div className="row">
                <div className="col-9">
                    <MovieDetails movieId={params.movieId} />
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
                                className="btn btn-outline-success me-2"
                            >
                                Write Review
                            </a>

                            <a href={`#`} className="btn btn-outline-primary">
                                Follow
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-6">
                    <h1>Reviews</h1>
                    {movieBoard?.reviews?.map((review) => {
                        return <Review review={review} />;
                    })}
                </div>
            </div>
        </>
    );
}
