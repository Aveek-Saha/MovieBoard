import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import prisma from "@/prisma/prisma";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faAt,
    faPenNib,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

import NavSidebar from "@/components/profile/NavSidebar";

async function getUserDetails(userId) {
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

export default async function User({ params }) {
    const session = await getServerSession(authOptions);
    const userId = params.userId;

    const user = await getUserDetails(userId);
    return (
        <div className="row">
            <div className="col-3 d-flex justify-content-center">
                <NavSidebar userId={userId} />
            </div>
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
                    <h5 className="fw-bold mb-0 mt-3 mb-1">{user.full_name}</h5>
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
                            {user.region}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
