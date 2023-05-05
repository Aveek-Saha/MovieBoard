"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavSidebar({ userId }) {
    const pathname = usePathname();
    const paths = pathname.split("/");
    const active = paths.at(-1);

    return (
        <div className="list-group">
            <Link
                href={`/profile/${userId}`}
                className={`link list-group-item ${
                    active === userId ? "active" : ""
                }`}
            >
                User info
            </Link>
            <Link
                href={`/profile/${userId}/reviews`}
                className={`link list-group-item ${
                    active === "reviews" ? "active" : ""
                }`}
            >
                Reviews
            </Link>
        </div>
    );
}
