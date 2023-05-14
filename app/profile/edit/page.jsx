import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import EditProfile from "@/components/profile/EditProfile";

import prisma from "@/prisma/prisma";

async function getUserDetails(userId) {
    const user = await prisma.User.findUnique({
        where: {
            id: userId,
        },
    });
    return user;
}

export default async function Page() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return <h1>Please login</h1>;
    }

    const userId = session?.user?.id;

    const user = await getUserDetails(userId);
    const { created_on, ...user_prop } = user;

    return <EditProfile user={user_prop} />;
}
