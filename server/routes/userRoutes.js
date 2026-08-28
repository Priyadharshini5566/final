import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { getProfile, syncUser } from "../controllers/userController.js";

const router = Router();
router.post("/sync", requireAuth, syncUser);
router.get("/:uid", getProfile);
export default router;
