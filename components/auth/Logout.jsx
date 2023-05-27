"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Logout() {
    const { data: session, status } = useSession();
    if (session) {
        return (
            <>
                <Link href={`/profile/user`} className="link">
                    <img
                        src={session.user.image}
                        className="rounded-circle img-thumbnail border-0 p-0 me-2 link_img img-fluid"
                        width={35}
                    />
                    <span className="me-2">{session.user.name}</span>
                </Link>{" "}
                •{" "}
                <a className="ms-2 link" onClick={() => signOut()}>
                    Logout
                </a>
            </>
        );
    }
}
