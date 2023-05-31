import prisma from "@/prisma/prisma";

export async function getNowPlaying() {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`;
    const nowPlaying = await fetch(url);
    return nowPlaying.json();
}

export async function getPopular() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`;
    const popular = await fetch(url);
    return popular.json();
}

export async function getResults(query) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false&region=US`;
    const res = await fetch(url);
    return res.json();
}

export async function getGenres() {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
    const genres = await fetch(url);
    return genres.json();
}

export async function getMovie(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
    const movie = await fetch(url);
    return movie.json();
}

export function toHoursAndMinutes(totalMinutes) {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${hours}h ${minutes}m`;
}

export function longDate(isoDate) {
    const date = new Date(isoDate);
    return date.toDateString().split(" ").slice(1).join(" ");
}

export async function getReviewsByUser(userId) {
    let reviews = await prisma.Review.findMany({
        where: {
            userId: userId,
        },
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
    });
    reviews = await Promise.all(
        reviews.map(async (review) => {
            const movie = await getMovie(review.tmdb_id);
            return {
                ...review,
                movie_title: movie.title,
                last_modified: review.last_modified.toDateString(),
                created_on: review.created_on.toDateString(),
            };
        })
    );
    return reviews;
}

export async function getReviewsByUserLikes(userId) {
    let reviews = await prisma.Review.findMany({
        where: {
            likedBy: {
                some: {
                    userId: userId,
                },
            },
        },
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
    });
    reviews = await Promise.all(
        reviews.map(async (review) => {
            const movie = await getMovie(review.tmdb_id);
            return {
                ...review,
                movie_title: movie.title,
                last_modified: review.last_modified.toDateString(),
                created_on: review.created_on.toDateString(),
            };
        })
    );
    return reviews;
}

export async function getFollowing(userId) {
    let following = await prisma.Reviewer.findUnique({
        where: {
            userId: userId,
        },
        include: {
            following: true,
        },
    });
    return following;
}

export async function getModerating(userId) {
    let moderating = await prisma.Moderator.findUnique({
        where: {
            userId: userId,
        },
        include: {
            moderates: true,
        },
    });
    return moderating;
}

export async function getModeratorsByMovie(movieId) {
    let moderators = await prisma.MovieBoard.findUnique({
        where: {
            tmdb_id: movieId,
        },
        include: {
            moderators: {
                select: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                            full_name: true,
                            created_on: true,
                            region: true,
                        },
                    },
                },
            },
        },
    });
    return moderators;
}

export async function createFollowingMovieList(reviewer) {
    let movieList = [];
    for (const movieBoard of reviewer.following) {
        const movie = await getMovie(movieBoard.tmdb_id);
        const genre_ids = movie.genres.map((genre) => {
            return genre.id;
        });
        movieList.push({ ...movie, genre_ids });
    }
    return movieList;
}

export async function createModeratingMovieList(moderator) {
    let movieList = [];
    for (const movieBoard of moderator.moderates) {
        const movie = await getMovie(movieBoard.tmdb_id);
        const genre_ids = movie.genres.map((genre) => {
            return genre.id;
        });
        movieList.push({ ...movie, genre_ids });
    }
    return movieList;
}

export async function getMovieBoard(movieId) {
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

export async function getAverageScore(movieId) {
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

export async function getUserDetails(userId) {
    const user = await prisma.User.findUnique({
        where: {
            id: userId,
        },
        include: {
            reviewer: {
                include: {
                    reviews: true,
                    _count: {
                        select: {
                            reviews: true,
                        },
                    },
                },
            },
        },
    });
    return user;
}
