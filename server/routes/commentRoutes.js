import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { createComment, deleteComment, listComments } from "../controllers/commentController.js";

const router = Router();
router.get("/project/:projectId", listComments);
router.post("/project/:projectId", requireAuth, createComment);
router.delete("/:id", requireAuth, deleteComment);
export default router;
