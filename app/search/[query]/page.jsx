import MovieGrid from "@/components/movies/MovieGrid";
import { getResults } from "@/components/utils";

export default async function SearchQuery({ params }) {
    const query = decodeURIComponent(params.query);
    const searchResults = await getResults(query);
    const movies = searchResults.results;
    return <MovieGrid movies={movies} />;
}
