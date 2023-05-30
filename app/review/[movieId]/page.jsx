import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import StarRating from "@/components/movies/StarRating";
import Review from "@/components/reviews/Review";
import MovieSidebar from "@/components/movies/MovieSidebar";
import ReviewButtons from "@/components/reviews/ReviewButtons";

import { getMovieBoard, getAverageScore, getMovie } from "@/components/utils";

export default async function Page({ params }) {
    const session = await getServerSession(authOptions);

    const avgScore = await getAverageScore(params.movieId);
    const rating = Math.round(avgScore._avg.rating * 10) / 10;
    const maxRating = 10;
    const numRating = avgScore._count.rating;

    const movieBoard = await getMovieBoard(params.movieId);
    let numFollowers = 0;
    let followers = [];
    let moderators = [];
    if (movieBoard) {
        numFollowers = movieBoard._count.followers;
        followers = movieBoard.followers;
        moderators = movieBoard.moderators;
    }
    const movie = await getMovie(params.movieId);

    const reviews = movieBoard?.reviews?.map((review) => {
        return {
            ...review,
            last_modified: review.last_modified.toDateString(),
            created_on: review.created_on.toDateString(),
        };
    });

    return (
        <>
            <div className="row">
                <div className="col-3 text-center d-none d-sm-none d-md-none d-lg-block">
                    <MovieSidebar movieId={params.movieId} />
                </div>
                <div className="col-12 col-xs-12 col-sm-8 col-lg-6">
                    <h1 className="d-block d-sm-block d-md-block d-lg-none">
                        {movie.title}
                    </h1>
                    <div className="d-block d-sm-none">
                        <h5 className="card-text">
                            <strong>{rating}</strong> from{" "}
                            <strong>{numRating}</strong> reviews
                        </h5>
                        <ReviewButtons
                            movieId={params.movieId}
                            followers={followers}
                            moderators={moderators}
                        />
                    </div>
                    <h2>Reviews</h2>
                    <div className="list-group list-group-flush mb-3">
                        {(!reviews || reviews.length === 0) && (
                            <h3 className="mt-4 text-muted">
                                Be the first one to write a review!
                            </h3>
                        )}
                        {reviews?.map((review) => {
                            return <Review key={review.id} review={review} />;
                        })}
                    </div>
                </div>
                <div className="col-3 col-sm-4 col-lg-3 d-none d-sm-block">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Average Rating</h5>
                            <h6 className="card-subtitle mt-2 mb-2 d-none d-lg-block">
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
                            <ReviewButtons
                                movieId={params.movieId}
                                followers={followers}
                                moderators={moderators}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
