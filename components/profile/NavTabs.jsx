"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function NavTabs({ userId }) {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const paths = pathname.split("/");
    const active = paths.at(-1);

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

            {session?.user.id === userId && (
                <li className="nav-item">
                    <Link
                        className={`nav-link ${
                            active === "likes" ? "active" : ""
                        }`}
                        href={`/profile/${userId}/likes`}
                    >
                        Likes
                    </Link>
                </li>
            )}
        </ul>
    );
}
