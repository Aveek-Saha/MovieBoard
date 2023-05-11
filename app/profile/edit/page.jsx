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

export default async function Page() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return <h1>Please login</h1>;
    }

    const userId = session?.user?.id;

    const user = await getUserDetails(userId);
    return (
        <div className="row">
            <div className="col-1"></div>
            <div className="col-2">
                <NavSidebar userId={userId} />
            </div>
            <div className="col-6">
                <img src={user.image} className="rounded-circle" />

                <div className="px-3 mt-3">
                    <label className="fw-bold text-muted">Name</label>
                    <input
                        type="text"
                        className="form-control mb-3 inputs"
                        // defaultValue={userName}
                        // onChange={(event) => setUserName(event.target.value)}
                    />
                    <label className="fw-bold text-muted">Bio</label>
                    <textarea
                        rows={3}
                        className="form-control mb-3 inputs"
                        // value={bio}
                        // onChange={(event) => setBio(event.target.value)}
                    />
                    <label className="fw-bold text-muted">Location</label>
                    <input
                        type="text"
                        className="form-control mb-3 inputs"
                        // defaultValue={location}
                        // onChange={(event) => setLocation(event.target.value)}
                    />
                    <button type="button" className="btn btn-outline-danger">
                        Enable Moderator mode
                    </button>
                </div>
            </div>
        </div>
    );
}
