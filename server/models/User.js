import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, lowercase: true, trim: true },
  photoURL: { type: String, default: "" },
  bio: { type: String, default: "", maxlength: 500 },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
