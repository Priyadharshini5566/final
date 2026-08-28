import User from "../models/User.js";
import Project from "../models/Project.js";

export async function syncUser(req, res) {
  const { name = req.user.name || "Student", email = req.user.email || "", photoURL = "" } = req.body;
  const user = await User.findOneAndUpdate(
    { firebaseUid: req.user.uid },
    { firebaseUid: req.user.uid, name, email, photoURL },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  res.json({ user });
}

export async function getProfile(req, res) {
  const user = await User.findOne({ firebaseUid: req.params.uid }).lean();
  const projects = await Project.find({ ownerUid: req.params.uid }).sort({ createdAt: -1 }).lean();
  res.json({ user, projects });
}
