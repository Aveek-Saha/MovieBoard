"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

import countries from "../countries";

export default function EditProfile({ user }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [handle, setHandle] = useState(user.name);
    const [bio, setBio] = useState(user.bio);
    const [region, setRegion] = useState(user.region);
    const [role, setRole] = useState(user.role);

    if (!session) {
        return <h1>Please login</h1>;
    }

    const editProfile = async () => {
        if (session) {
            const res = await fetch(`/api/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    handle,
                    bio,
                    region,
                    role,
                }),
            });
            router.push(`/profile/${user.id}`);
        } else {
            router.push("/login");
        }
    };
    return (
        <div className="row">
            <div className="col-3"></div>
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
                    <label
                        htmlFor="fullName"
                        className="col-sm-2 col-form-label"
                    >
                        Name
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            readOnly
                            className="form-control-plaintext text-muted"
                            id="fullName"
                            value={user.full_name}
                            onChange={(e) => ""}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="handle" className="col-sm-2 col-form-label">
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
                                value={handle}
                                onChange={(e) => setHandle(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label
                        htmlFor="staticEmail"
                        className="col-sm-2 col-form-label"
                    >
                        Email
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            readOnly
                            className="form-control-plaintext text-muted"
                            id="staticEmail"
                            value={user.email}
                            onChange={(e) => ""}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="bio" className="col-sm-2 col-form-label">
                        Bio
                    </label>
                    <div className="col-sm-10">
                        <textarea
                            className="form-control inputs"
                            id="Bio"
                            rows={4}
                            maxLength={280}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="region" className="col-sm-2 col-form-label">
                        Region
                    </label>
                    <div className="col-sm-10">
                        <input
                            className="form-control form-control inputs"
                            list="datalistOptions"
                            id="region"
                            placeholder="Type to search..."
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                        />
                        <datalist id="datalistOptions">
                            {Object.keys(countries).map((code) => {
                                return (
                                    <option value={code}>
                                        {countries[code]}
                                    </option>
                                );
                            })}
                        </datalist>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="role" className="col-sm-2 col-form-label">
                        Role
                    </label>
                    <div className="col-sm-10">
                        <select
                            className="form-select form-control inputs"
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
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
                    <button
                        className="btn btn-outline-success m-2"
                        onClick={(e) => editProfile()}
                    >
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    );
}
