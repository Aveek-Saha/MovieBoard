import HomeTabs from "@/components/home/HomeTabs";
import MovieGrid from "@/components/movies/MovieGrid";
import { getNowPlaying } from "@/components/utils";

export default async function Home() {
    const nowPlaying = await getNowPlaying();
    const movies = nowPlaying.results;
    return (
        <div>
            <HomeTabs />
            <div className="row">
                <MovieGrid movies={movies} />
            </div>
        </div>
    );
}
