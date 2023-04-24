import MovieDetails from "@/components/movies/MovieDetails";

export default function Page({ params }) {
    return (
        <>
            <div className="row">
                <MovieDetails movieId={params.movieId} />
            </div>
            <div className="row justify-content-center">
                <div className="col-8 col-lg-3 col-md-4 col-sm-6 col-xs-8 d-flex justify-content-center">
                    <a
                        href={`/review/${params.movieId}`}
                        className="btn btn-lg btn-dark"
                    >
                        Show reviews
                    </a>
                </div>
            </div>
        </>
    );
}
