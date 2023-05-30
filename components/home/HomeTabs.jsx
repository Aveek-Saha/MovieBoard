"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function HomeTabs() {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const paths = pathname.split("/");
    const active = paths.at(-1);

    return (
        <ul className="nav profile_tab mt-4 mb-3 fw-bold nav-justified">
            <li className="nav-item">
                <Link
                    className={`nav-link ${active === "" ? "active" : ""}`}
                    href={`/`}
                >
                    Now Playing
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className={`nav-link ${
                        active === "popular" ? "active" : ""
                    }`}
                    href={`/popular`}
                >
                    Popular
                </Link>
            </li>
            {session &&
                session.user.role ===
                    "reviewer"&& (
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${
                                    active === "following" ? "active" : ""
                                }`}
                                href={`/following`}
                            >
                                Following
                            </Link>
                        </li>
                    )}
            {session &&
                session.user.role ===
                    "moderator" && (
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${
                                    active === "moderating" ? "active" : ""
                                }`}
                                href={`/moderating`}
                            >
                                Moderating
                            </Link>
                        </li>
                    )}
        </ul>
    );
}
