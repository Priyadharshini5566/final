import { Router } from "express";
import { listComments, createComment } from "../controllers/commentController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { addRating, createProject, deleteProject, getFavorites, getMyProjects, getProject, listProjects, toggleFavorite, toggleLike, updateProject } from "../controllers/projectController.js";

const router = Router();

router.get("/", listProjects);
router.get("/mine", requireAuth, getMyProjects);
router.get("/favorites", requireAuth, getFavorites);
router.get("/:id", getProject);
router.post("/", requireAuth, createProject);
router.put("/:id", requireAuth, updateProject);
router.delete("/:id", requireAuth, deleteProject);
router.post("/:id/favorite", requireAuth, toggleFavorite);
router.post("/:id/like", requireAuth, toggleLike);
router.post("/:id/rating", requireAuth, addRating);
router.get("/:projectId/comments", listComments);
router.post("/:projectId/comments", requireAuth, createComment);

export default router;
