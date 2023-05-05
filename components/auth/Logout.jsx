"use client";

import { signOut, useSession } from "next-auth/react";

export default function Logout() {
    const { data: session, status } = useSession();
    if (session) {
        return (
            <>
                <img
                    src={session.user.image}
                    className="rounded-circle img-thumbnail border-0 p-0 me-2 link link_img img-fluid"
                    width={35}
                />
                <a className="link" onClick={() => signOut()}>
                    Logout
                </a>
            </>
        );
    }
}
