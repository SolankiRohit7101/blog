import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    post: {
      type: [Schema.Types.ObjectId],
      ref: "Blog",
    },
    profile_image: {
      type: String,
    },
  },
  { timestamps: true }
);

const userModel = new model("User", userSchema);

export default userModel;
