import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
    user_name: String,
    user_email: String,
    auth_token: String,
    follows_boards: [{ type: Schema.Types.ObjectId, ref: "MovieBoard" }],
    liked_reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    created_date: Date,
});

const User = model("User", userSchema);
export default User;
