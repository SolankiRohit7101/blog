import { Schema, model } from "mongoose";

const likedBySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);
const blogSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    likes: {
      numOfLike: {
        type: Number,
        required: true,
        default: 0,
      },
      likedBy: [likedBySchema],
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const blogModel = new model("Blog", blogSchema);

export default blogModel;
