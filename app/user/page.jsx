import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function User() {
    const session = await getServerSession(authOptions);

    if (!session) {
    }
    return (
        <div className="row justify-content-center">
            <h1>{session.user.name}</h1>
            <h1>{session.user.role}</h1>
            <h1>{session.user.username}</h1>
        </div>
    );
}
