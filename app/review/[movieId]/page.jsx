import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import StarRating from "@/components/movies/StarRating";
import Review from "@/components/reviews/Review";
import MovieSidebar from "@/components/movies/MovieSidebar";
import Follow from "@/components/movies/Follow";
import Moderate from "@/components/movies/Moderate";
import prisma from "@/prisma/prisma";
import Link from "next/link";

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
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true,
                                    image: true,
                                    full_name: true,
                                    role: true,
                                },
                            },
                        },
                    },
                    likedBy: true,

                    _count: {
                        select: { likedBy: true },
                    },
                },
                orderBy: {
                    created_on: "desc",
                },
            },
            followers: {
                select: {
                    userId: true,
                },
            },
            moderators: {
                select: {
                    userId: true,
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
                <div className="col-3 text-center">
                    <MovieSidebar movieId={params.movieId} />
                </div>
                <div className="col-6">
                    <h1>Reviews</h1>
                    <div className="list-group list-group-flush mb-3">
                        {reviews?.map((review) => {
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
                            {session && session.user.role === "reviewer" && (
                                <>
                                    <Link
                                        href={`/review/${params.movieId}/new`}
                                        className="btn btn-outline-success m-2"
                                    >
                                        Write Review
                                    </Link>
                                    <Follow
                                        movieId={params.movieId}
                                        followers={followers}
                                    />
                                </>
                            )}
                            {session && session.user.role === "moderator" && (
                                <Moderate
                                    movieId={params.movieId}
                                    moderators={moderators}
                                />
                            )}
                            {!session && (
                                <Link
                                    href={`/login`}
                                    className="btn btn-outline-success m-2"
                                >
                                    Login to review
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
