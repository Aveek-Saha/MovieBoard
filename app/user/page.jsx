import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import prisma from "@/prisma/prisma";

async function getUserDetails(session) {
    const user = await prisma.User.findUnique({
        where: {
            id: session.user.id,
        },
    });
    return user;
}

async function getReviewerDetails(session) {
    const reviewer = await prisma.Reviewer.findUnique({
        where: {
            userId: session.user.id,
        },
    });
    console.log(reviewer);
    return reviewer;
}

export default async function User() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return(
            <h1>Please Login</h1>
        )
    } else {
        
    const user = await getUserDetails(session);
    const reviewer = await getReviewerDetails(session);
    return (
        <div className="row justify-content-center">
            <h1>{user.name}</h1>
            <h1>{user.role}</h1>
            <h1>{user.username}</h1>
            <h1>{user.email}</h1>
            <br />

            <h1>{reviewer.id}</h1>
        </div>
    );
    }
}
