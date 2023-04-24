import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import CreateReview from "@/components/reviews/CreateReview";

export default async function Page({ params }) {
    const session = await getServerSession(authOptions);
    if (session) {
        return (
            <div className="row justify-content-center">
                <CreateReview tmdb_id={params.movieId} />
            </div>
        );
    }
    return <div>Please log in</div>;
}
