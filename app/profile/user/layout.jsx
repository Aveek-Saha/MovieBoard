import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import Profile from "@/components/profile/Profile";

export default async function ProfileLayout({ children }) {
    const session = await getServerSession(authOptions);

    if (session) {
        return (
            <Profile userId={session.user.id}>
                {children}
            </Profile>
        );
    }
}
