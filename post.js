import mongoose from "mongoose";
const postSchema = mongoose.Schema(
  {
    selectedChoice: { type: String },
    author: { type: String },
    title: { type: String },
    textAreaValue: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("post", postSchema);
