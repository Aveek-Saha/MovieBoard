import prisma from "@/prisma/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextResponse } from "next/server";

export async function PUT(request) {
    const session = await getServerSession(authOptions);
    const req = await request.json();
    const { handle, bio, region, role } = req;
    if (session) {
        if (role === "moderator") {
            let moderator = await prisma.Moderator.findUnique({
                where: {
                    userId: session.user.id,
                },
            });
            if (!moderator) {
                moderator = await prisma.Moderator.create({
                    data: {
                        user: { connect: { id: session.user.id } },
                    },
                });

                if (!moderator) {
                    return NextResponse.json(
                        {
                            success: false,
                            message: "Could not create moderator profile",
                        },
                        {
                            status: 500,
                        }
                    );
                }
            }
        }
        const profile = await prisma.User.update({
            where: {
                id: session.user.id,
            },
            data: {
                name: handle,
                bio: bio,
                region: region,
                role: role,
            },
        });
        return NextResponse.json(profile);
    }
    return NextResponse.json(
        {
            success: false,
            message: "Auth failed",
        },
        {
            status: 401,
        }
    );
}
