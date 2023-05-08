"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default async function User() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (!session) {
        router.push(`/login`);
    } else {
        const router = useRouter();
        router.push(`/profile/${session?.user.id}`);
    }
}
