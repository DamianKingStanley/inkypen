import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    userId: { type: String },
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    Location: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", userSchema);
