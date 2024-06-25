import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    post: {
      type: [Schema.Types.ObjectId],
      ref: "Blog",
    },
    profile_image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const userModel = new model("User", userSchema);

export default userModel;
