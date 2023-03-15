import mongoose from "mongoose";
import { User } from "./User";
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User" },
    text: String,
    likes: Number,
    created_date: Date,
});

const Review = model("Review", reviewSchema);
export default Review;
