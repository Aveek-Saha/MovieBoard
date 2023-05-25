"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function NavTabs({ userId }) {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const paths = pathname.split("/");
    const active = paths.at(-1);
    if (session?.user.id === userId) {
        return (
            <ul className="nav profile_tab mt-4 mb-3 fw-bold nav-justified">
                <li className="nav-item">
                    <Link
                        className={`nav-link ${
                            active === "reviews" ? "active" : ""
                        }`}
                        href={`/profile/user/reviews`}
                    >
                        Reviews
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className={`nav-link ${
                            active === "following" ? "active" : ""
                        }`}
                        href={`/profile/user/following`}
                    >
                        Following
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className={`nav-link ${
                            active === "likes" ? "active" : ""
                        }`}
                        href={`/profile/user/likes`}
                    >
                        Likes
                    </Link>
                </li>
                {session?.user.role === "moderator" && (
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${
                                active === "moderating" ? "active" : ""
                            }`}
                            href={`/profile/user/moderating`}
                        >
                            Moderating
                        </Link>
                    </li>
                )}
            </ul>
        );
    }

    return (
        <ul className="nav profile_tab mt-4 mb-3 fw-bold nav-justified">
            <li className="nav-item">
                <Link
                    className={`nav-link ${
                        active === "reviews" ? "active" : ""
                    }`}
                    href={`/profile/${userId}/reviews`}
                >
                    Reviews
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className={`nav-link ${
                        active === "following" ? "active" : ""
                    }`}
                    href={`/profile/${userId}/following`}
                >
                    Following
                </Link>
            </li>
        </ul>
    );
}
