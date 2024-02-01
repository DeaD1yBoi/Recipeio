import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    match: [
      /^.{4,30}$/,
      "Username invalid, it should contain 4-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
  savedPosts:{
    type: [Schema.Types.ObjectId],
    ref: "Post"
  }
});

const User = models.User || model("User", UserSchema);
export default User;
