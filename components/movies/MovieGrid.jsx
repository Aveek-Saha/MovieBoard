import MovieCard from "./MovieCard";

export default async function MovieGrid({ movies }) {
    return (
        <div className="row row-cols-2 row-cols-xl-6 row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-xs-2 g-4">
            {movies?.map((movie) => {
                return <MovieCard key={movie.id} movie={movie} />;
            })}
        </div>
    );
}
