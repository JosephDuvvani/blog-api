import { Router } from "express";
import {
  adminSignupPost,
  loginPost,
  refreshToken,
  signupPost,
} from "../controllers/auth.js";

const router = Router();

router.post("/admin/signup", adminSignupPost);

router.post("/signup", signupPost);

router.post("/login", loginPost);

router.post("/token", refreshToken);

export default router;
