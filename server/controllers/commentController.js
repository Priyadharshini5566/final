import Comment from "../models/Comment.js";
import Project from "../models/Project.js";

export async function listComments(req, res) {
  const comments = await Comment.find({ projectId: req.params.projectId }).sort({ createdAt: -1 }).lean();
  res.json({ comments });
}

export async function createComment(req, res) {
  const content = req.body.content?.trim();
  if (!content) return res.status(400).json({ message: "Comment cannot be empty." });
  const project = await Project.exists({ _id: req.params.projectId });
  if (!project) return res.status(404).json({ message: "Project not found." });
  const comment = await Comment.create({
    projectId: req.params.projectId,
    userUid: req.user.uid,
    userName: req.user.name || req.user.email?.split("@")[0] || "Student",
    content,
  });
  res.status(201).json({ comment });
}

export async function deleteComment(req, res) {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).json({ message: "Comment not found." });
  if (comment.userUid !== req.user.uid) return res.status(403).json({ message: "You can only delete your own comment." });
  await comment.deleteOne();
  res.json({ message: "Comment deleted." });
}
