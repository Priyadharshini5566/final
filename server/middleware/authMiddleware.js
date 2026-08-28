import { firebaseAdmin } from "../config/firebaseAdmin.js";

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    if (!header.startsWith("Bearer ")) return res.status(401).json({ message: "Authentication required." });
    const token = header.split("Bearer ")[1];
    req.user = await firebaseAdmin.auth().verifyIdToken(token);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired authentication token." });
  }
}
