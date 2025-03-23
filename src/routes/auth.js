import { Router } from "express";
import { loginPost, signupPost } from "../controllers/auth.js";

const router = Router();

router.post("/signup", signupPost);

router.post("/login", loginPost);

export default router;
