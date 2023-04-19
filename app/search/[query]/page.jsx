import MovieGrid from "@/components/movies/MovieGrid";

async function getResults(query) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false&region=US`;
    const res = await fetch(url);
    return res.json();
}

export default async function SearchQuery({ params }) {
    const query = decodeURIComponent(params.query);
    const searchResults = await getResults(query);
    const movies = searchResults.results;
    return <MovieGrid movies={movies} />;
}
