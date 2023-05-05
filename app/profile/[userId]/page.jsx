import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import prisma from "@/prisma/prisma";

import NavSidebar from "@/components/profile/NavSidebar";

async function getUserDetails(userId) {
    const user = await prisma.User.findUnique({
        where: {
            id: userId,
        },
    });
    return user;
}

async function getReviewerDetails(userId) {
    const reviewer = await prisma.Reviewer.findUnique({
        where: {
            userId: userId,
        },
    });
    return reviewer;
}

export default async function User({ params }) {
    const session = await getServerSession(authOptions);
    const userId = params.userId;

    const user = await getUserDetails(userId);
    const reviewer = await getReviewerDetails(userId);
    return (
        <div className="row justify-content-center">
            <div className="col-2">
                <NavSidebar userId={userId}/>
            </div>
            <div className="col-8">
                <h1>{user.name}</h1>
                <h1>{user.role}</h1>
                <h1>{user.username}</h1>
                <h1>{user.email}</h1>
                <br />

                <h1>{reviewer.id}</h1>
            </div>
        </div>
    );
}
