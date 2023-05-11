import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Link from "next/link";

import prisma from "@/prisma/prisma";

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
            <div className="col-3 d-flex justify-content-center">
                <NavSidebar userId={userId} />
            </div>
            <div className="col-6">
                <div className="row mb-3">
                    <div className="col-5">
                        <img
                            src={user.image}
                            className="rounded-circle img-fluid w-50"
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label for="fullName" className="col-sm-2 col-form-label">
                        Name
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            readonly
                            className="form-control-plaintext text-muted"
                            id="fullName"
                            value={user.full_name}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="handle" className="col-sm-2 col-form-label">
                        Handle
                    </label>
                    <div className="col-sm-10">
                        <div className="input-group">
                            <span
                                className="input-group-text input_highlight text-muted ps-2 pe-2 pt-0 pb-0"
                                id="handle"
                            >
                                @
                            </span>
                            <input
                                type="text"
                                className="form-control inputs"
                                id="handle"
                                value={user.name}
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label
                        for="staticEmail"
                        className="col-sm-2 col-form-label"
                    >
                        Email
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            readonly
                            className="form-control-plaintext text-muted"
                            id="staticEmail"
                            value={user.email}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="bio" className="col-sm-2 col-form-label">
                        Bio
                    </label>
                    <div className="col-sm-10">
                        <textarea
                            className="form-control inputs"
                            id="Bio"
                            rows={4}
                            value={user.bio}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="region" className="col-sm-2 col-form-label">
                        Region
                    </label>
                    <div className="col-sm-10">
                        <input
                            className="form-control form-control inputs"
                            list="datalistOptions"
                            id="region"
                            placeholder="Type to search..."
                            value={user.region}
                        />
                        <datalist id="datalistOptions">
                            <option value="US">United States</option>
                            <option value="IN">India</option>
                            <option value="UK">United Kingdom</option>
                            <option value="JP">Japan</option>
                            <option value="DE">Germany</option>
                        </datalist>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="role" className="col-sm-2 col-form-label">
                        Role
                    </label>
                    <div className="col-sm-10">
                        <select
                            className="form-select form-control inputs"
                            id="role"
                            value={user.role}
                        >
                            <option value="reviewer">Reviewer</option>
                            <option value="moderator">Moderator</option>
                        </select>
                    </div>
                </div>
                <div>
                    <Link
                        href={`/profile/${user.id}`}
                        className="btn btn-outline-danger m-2"
                    >
                        Back
                    </Link>
                    <button className="btn btn-outline-success m-2">
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    );
}
