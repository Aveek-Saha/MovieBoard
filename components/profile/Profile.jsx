import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Link from "next/link";

import { getUserDetails } from "../utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faAt,
    faPenNib,
    faEnvelope,
    faUserGear,
    faLock,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar, faPenToSquare } from "@fortawesome/free-regular-svg-icons";

import countries from "@/components/countries";
import NavTabs from "@/components/profile/NavTabs";


export default async function Profile({ userId, children }) {
    const session = await getServerSession(authOptions);

    const user = await getUserDetails(userId);
    return (
        <div className="row">
            <div className="col-3 d-flex justify-content-center"></div>
            <div className="col-6">
                <div className="row">
                    <div className="col-5">
                        <img
                            src={user.image}
                            className="rounded-circle img-fluid w-50"
                        />
                    </div>
                </div>

                <div className="px-3">
                    <h4 className="fw-bold mt-3 mb-1">{user.full_name}</h4>
                    <div className="text-muted">
                        <FontAwesomeIcon icon={faAt} /> {user.name}
                    </div>

                    <div className="mt-2">{user.bio}</div>

                    <div className="text-muted mt-2">
                        <span className="me-4">
                            <FontAwesomeIcon
                                icon={faPenNib}
                                className={"me-2"}
                            />
                            <span className="fw-bold">
                                {user.reviewer._count.reviews}{" "}
                            </span>
                            <span className="text-muted">Reviews</span>
                        </span>
                        <span className="me-4">
                            <FontAwesomeIcon
                                icon={faCalendar}
                                className={"me-2"}
                            />
                            Joined{" "}
                            {user.created_on
                                .toDateString()
                                .split(" ")
                                .slice(1)
                                .join(" ")}
                        </span>
                        <span className="me-4">
                            <FontAwesomeIcon
                                icon={faLocationDot}
                                className={"me-2"}
                            />
                            {countries[user.region]}
                        </span>
                    </div>
                </div>
                {session.user.id === userId && (
                    <div className="px-3 mt-4 mb-3">
                        <div className="mb-3 h5">
                            <FontAwesomeIcon icon={faLock} className={"me-2"} />
                            <span className="fw-bold">Private</span>
                        </div>

                        <div className="text-muted mt-2">
                            <span className="me-4">
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className={"me-2"}
                                />
                                <span className="text-muted">{user.email}</span>
                            </span>
                            <span className="me-4 text-capitalize">
                                <FontAwesomeIcon
                                    icon={faUserGear}
                                    className={"me-2"}
                                />
                                {user.role}
                            </span>
                        </div>
                    </div>
                )}

                <NavTabs userId={userId} />
                <div>{children}</div>
            </div>
            <div className="col-3">
                {session.user.id === userId && (
                    <Link
                        href={`/profile/edit`}
                        className="btn btn-outline-success m-2"
                    >
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="me-2"
                        />
                        Edit Profile
                    </Link>
                )}
            </div>
        </div>
    );
}
