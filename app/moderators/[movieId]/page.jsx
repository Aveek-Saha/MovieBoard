import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Link from "next/link";

import MovieSidebar from "@/components/movies/MovieSidebar";
import { getModeratorsByMovie, getMovie } from "@/components/utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faAt } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

import countries from "@/components/countries";

export default async function Page({ params }) {
    const session = await getServerSession(authOptions);
    if (!session && session.user.role !== "moderator") {
        return <h1>Unauthorized access</h1>;
    }

    const movieBoard = await getModeratorsByMovie(params.movieId);
    let moderators = [];
    if (movieBoard) {
        moderators = movieBoard.moderators;
    }
    const movie = await getMovie(params.movieId);

    return (
        <>
            <div className="row">
                <div className="col text-center d-none d-sm-none d-md-none d-lg-block">
                    <MovieSidebar movieId={params.movieId} />
                </div>
                <div className="col-12 col-xs-12 col-sm-12 col-lg-6">
                    <h1 className="d-block d-sm-block d-md-block d-lg-none">
                        {movie.title}
                    </h1>
                    <h2>Moderators</h2>
                    <div className="list-group list-group-flush mb-3">
                        {(!moderators || moderators.length === 0) && (
                            <h3 className="mt-4 text-muted">
                                No moderators yet
                            </h3>
                        )}
                        {moderators?.map((moderator) => {
                            return (
                                <div
                                    key={moderator.user.id}
                                    className="list-group-item p-3"
                                >
                                    <div className="row">
                                        <div className="col-2 p-0 ps-2">
                                            <Link
                                                href={`/profile/${moderator.user.id}`}
                                                className="link_img"
                                            >
                                                <img
                                                    src={`${moderator.user.image}`}
                                                    className="rounded-circle img-fluid"
                                                    alt="avatar"
                                                />
                                            </Link>
                                        </div>
                                        <div className="col-10 ps-3">
                                            <div className="row">
                                                <div className="col-11">
                                                    <div className="fw-bolder">
                                                        <Link
                                                            href={`/profile/${moderator.user.id}`}
                                                            className="link"
                                                        >
                                                            {
                                                                moderator.user
                                                                    .full_name
                                                            }
                                                        </Link>
                                                    </div>
                                                    <div className="text-muted mt-1">
                                                        <FontAwesomeIcon
                                                            icon={faAt}
                                                            className={"me-2"}
                                                        />
                                                        {moderator.user.name}
                                                    </div>
                                                    <div className="text-muted mt-2">
                                                        <FontAwesomeIcon
                                                            icon={faCalendar}
                                                            className={"me-2"}
                                                        />
                                                        Joined{" "}
                                                        {moderator.user.created_on
                                                            .toDateString()
                                                            .split(" ")
                                                            .slice(1)
                                                            .join(" ")}
                                                    </div>
                                                    <div className="text-muted mt-1">
                                                        <FontAwesomeIcon
                                                            icon={faLocationDot}
                                                            className={"me-2"}
                                                        />
                                                        {
                                                            countries[
                                                                moderator.user
                                                                    .region
                                                            ]
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="col"></div>
            </div>
        </>
    );
}
