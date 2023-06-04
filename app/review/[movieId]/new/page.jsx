import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import CreateReview from "@/components/reviews/CreateReview";
import MovieSidebar from "@/components/movies/MovieSidebar";

export default async function Page({ params }) {
    const session = await getServerSession(authOptions);
    if (session) {
        if (session.user.role !== "reviewer") {
            return <div>Only reviewers can review movies</div>;
        }
        return (
            <div className="row">
                <div className="col-3 text-center d-none d-sm-none d-md-block col-md-4 col-lg-3">
                    <MovieSidebar movieId={params.movieId} />
                </div>
                <CreateReview tmdb_id={params.movieId} />
            </div>
        );
    }
    return <h1 className="text-center">Please log in</h1>;
}
