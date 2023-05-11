"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faHeart,
    faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import { faFilm, faPenNib } from "@fortawesome/free-solid-svg-icons";

export default function NavSidebar({ userId }) {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const paths = pathname.split("/");
    const active = paths.at(-1);

    return (
        <div className="list-group list-group-flush">
            <Link
                href={`/profile/${userId}`}
                className={`link list-group-item border-0  ${
                    active === userId ? "fw-bold text-decoration-underline" : ""
                }`}
            >
                <div className="m-1 fs-5">
                    <FontAwesomeIcon icon={faUser} className="me-3" />
                    <span>Profile</span>
                </div>
            </Link>
            <Link
                href={`/profile/${userId}/reviews`}
                className={`link list-group-item border-0  ${
                    active === "reviews"
                        ? "fw-bold text-decoration-underline"
                        : ""
                }`}
            >
                <div className="m-1 fs-5">
                    <FontAwesomeIcon icon={faPenNib} className="me-3" />
                    <span>Reviews</span>
                </div>
            </Link>
            <Link
                href={`/profile/${userId}/following`}
                className={`link list-group-item border-0 ${
                    active === "following"
                        ? "fw-bold text-decoration-underline"
                        : ""
                }`}
            >
                <div className="m-1 fs-5">
                    <FontAwesomeIcon icon={faFilm} className="me-3" />
                    <span>Following</span>
                </div>
            </Link>
            {session?.user?.id === userId && (
                <>
                    <Link
                        href={`/profile/likes`}
                        className={`link list-group-item border-0 ${
                            active === "likes"
                                ? "fw-bold text-decoration-underline"
                                : ""
                        }`}
                    >
                        <div className="m-1 fs-5">
                            <FontAwesomeIcon icon={faHeart} className="me-3" />
                            <span>Likes</span>
                        </div>
                    </Link>
                </>
            )}
        </div>
    );
}
