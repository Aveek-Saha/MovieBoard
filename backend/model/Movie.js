import mongoose from "mongoose";
const { Schema, model } = mongoose;

const movieSchema = new Schema({
    _id: String,
    backdrop_path: String,
    genres: [String],
    title: String,
    original_title: String,
    overview: String,
    poster_path: String,
    release_date: Date,
    cache_date: Date,
    imdb_id: String,
    status: String,
});

const Movie = model("Movie", movieSchema);
export default Movie;
