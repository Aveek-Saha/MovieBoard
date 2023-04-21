"use client";

import { signOut } from "next-auth/react";

export default function Logout() {
    return (
        <a onClick={() => signOut()}>
            <i
                className="bi bi-box-arrow-right me-2"
                role="img"
                aria-label="Logout"
            />
            Logout
        </a>
    );
}
