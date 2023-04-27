import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import CreateReview from "@/components/reviews/CreateReview";
import MovieSidebar from "@/components/movies/MovieSidebar";

export default async function Page({ params }) {
    const session = await getServerSession(authOptions);
    if (session) {
        return (
            <div className="row">
                <div className="col-3 text-center">
                    <MovieSidebar movieId={params.movieId} />
                </div>
                <CreateReview tmdb_id={params.movieId} />
            </div>
        );
    }
    return <div>Please log in</div>;
}
