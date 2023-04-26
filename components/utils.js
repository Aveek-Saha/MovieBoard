export async function getMovie(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
    const movie = await fetch(url);
    return movie.json();
}

export function toHoursAndMinutes(totalMinutes) {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${hours}h ${minutes}m`;
}

export function longDate(isoDate) {
    const date = new Date(isoDate);
    return date.toDateString().split(" ").slice(1).join(" ");
}