import { getPopular } from "@/components/utils";
import MovieGrid from "@/components/movies/MovieGrid";

export default async function HomePopular() {
    const popular = await getPopular();
    const movies = popular.results;
    return (
        <div className="row">
            <MovieGrid movies={movies} />
        </div>
    );
}
