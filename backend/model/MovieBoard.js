import mongoose from "mongoose";
import { Movie } from "./Movie";
const { Schema, model } = mongoose;

const movieBoardSchema = new Schema({
    movie: Movie,
    admins: [{ type: Schema.Types.ObjectId, ref: "User" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    followers: Number,
    rating: Number,
    created_date: Date,
});

const MovieBoard = model("MovieBoard", movieBoardSchema);
export default MovieBoard;
