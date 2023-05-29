"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function User() {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        void (async function () {
            if (!session) {
                router.push(`/login`);
            } else {
                router.push(`/profile/user`);
            }
        })();
    }, [session, router]);

    return;
}
