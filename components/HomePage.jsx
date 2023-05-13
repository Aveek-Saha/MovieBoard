import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import NowPlaying from "./movies/NowPlaying";
import Popular from "./movies/Popular";
import Following from "./movies/Following";

export default async function HomePage() {
    const session = await getServerSession(authOptions);
    return (
        <div className="row">
            {session && <Following />}
            <NowPlaying />
            <Popular />
        </div>
    );
}
