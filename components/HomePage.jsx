import NowPlaying from "./movies/NowPlaying";
import Popular from "./movies/Popular";

export default function HomePage() {
    return (
        <div className="row">
            <NowPlaying />
            <Popular />
        </div>
    );
}
