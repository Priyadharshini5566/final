import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, required: true, trim: true, maxlength: 3000 },
  tags: { type: [String], required: true, validate: v => v.length > 0 },
  githubUrl: { type: String, required: true, trim: true },
  liveDemoUrl: { type: String, default: "", trim: true },
  ownerUid: { type: String, required: true, index: true },
  ownerName: { type: String, required: true },
  ownerEmail: { type: String, required: true },
  favorites: { type: [String], default: [] },
  likes: { type: [String], default: [] },
  ratingTotal: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
