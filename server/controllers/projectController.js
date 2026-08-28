import Project from "../models/Project.js";
import Comment from "../models/Comment.js";
import { isValidUrl } from "../utils/validators.js";

export async function listProjects(req, res) {
  const { search = "", tag = "", page = 1, limit = 9 } = req.query;
  const filter = {};
  if (search.trim()) filter.$or = [
    { title: { $regex: search.trim(), $options: "i" } },
    { description: { $regex: search.trim(), $options: "i" } }
  ];
  if (tag.trim()) filter.tags = tag.trim();

  const pageNumber = Math.max(Number(page) || 1, 1);
  const pageSize = Math.min(Math.max(Number(limit) || 9, 1), 30);
  const [projects, total, tagDocs] = await Promise.all([
    Project.find(filter).sort({ createdAt: -1 }).skip((pageNumber - 1) * pageSize).limit(pageSize).lean(),
    Project.countDocuments(filter),
    Project.distinct("tags")
  ]);

  res.json({ projects, page: pageNumber, pages: Math.max(Math.ceil(total / pageSize), 1), total, tags: tagDocs.sort() });
}

export async function getProject(req, res) {
  const project = await Project.findById(req.params.id).lean();
  if (!project) return res.status(404).json({ message: "Project not found." });
  res.json({ project });
}

export async function getMyProjects(req, res) {
  const projects = await Project.find({ ownerUid: req.user.uid }).sort({ createdAt: -1 }).lean();
  res.json({ projects });
}

export async function createProject(req, res) {
  const { title, description, tags, githubUrl, liveDemoUrl = "" } = req.body;
  if (!title?.trim() || !description?.trim() || !Array.isArray(tags) || !tags.length || !isValidUrl(githubUrl)) {
    return res.status(400).json({ message: "Title, description, tags and a valid GitHub URL are required." });
  }
  if (liveDemoUrl && !isValidUrl(liveDemoUrl)) return res.status(400).json({ message: "Live demo URL is invalid." });

  const project = await Project.create({
    title, description, tags: [...new Set(tags.map(t => t.trim()).filter(Boolean))],
    githubUrl, liveDemoUrl, ownerUid: req.user.uid,
    ownerName: req.user.name || req.user.email?.split("@")[0] || "Student",
    ownerEmail: req.user.email || "",
  });
  res.status(201).json({ project });
}

export async function updateProject(req, res) {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found." });
  if (project.ownerUid !== req.user.uid) return res.status(403).json({ message: "You can only edit your own project." });

  const { title, description, tags, githubUrl, liveDemoUrl = "" } = req.body;
  if (!title?.trim() || !description?.trim() || !Array.isArray(tags) || !tags.length || !isValidUrl(githubUrl)) {
    return res.status(400).json({ message: "Please provide valid project details." });
  }
  if (liveDemoUrl && !isValidUrl(liveDemoUrl)) return res.status(400).json({ message: "Live demo URL is invalid." });

  Object.assign(project, { title, description, tags, githubUrl, liveDemoUrl });
  await project.save();
  res.json({ project });
}

export async function deleteProject(req, res) {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found." });
  if (project.ownerUid !== req.user.uid) return res.status(403).json({ message: "You can only delete your own project." });
  await Promise.all([project.deleteOne(), Comment.deleteMany({ projectId: project._id })]);
  res.json({ message: "Project deleted successfully." });
}

export async function toggleFavorite(req, res) {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found." });
  const index = project.favorites.indexOf(req.user.uid);
  if (index >= 0) project.favorites.splice(index, 1); else project.favorites.push(req.user.uid);
  await project.save();
  res.json({ favorited: index < 0 });
}

export async function toggleLike(req, res) {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found." });
  const index = project.likes.indexOf(req.user.uid);
  if (index >= 0) project.likes.splice(index, 1); else project.likes.push(req.user.uid);
  await project.save();
  res.json({ liked: index < 0 });
}

export async function getFavorites(req, res) {
  const projects = await Project.find({ favorites: req.user.uid }).sort({ createdAt: -1 }).lean();
  res.json({ projects });
}

export async function addRating(req, res) {
  const rating = Number(req.body.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return res.status(400).json({ message: "Rating must be 1 to 5." });
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found." });
  project.ratingTotal += rating;
  project.ratingCount += 1;
  await project.save();
  res.json({ average: project.ratingTotal / project.ratingCount });
}
