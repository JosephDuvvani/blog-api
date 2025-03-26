import { Router } from "express";
import {
  adminSignupPost,
  loginPost,
  logoutPost,
  refreshToken,
  signupPost,
} from "../controllers/auth.js";

const router = Router();

router.post("/admin/signup", adminSignupPost);

router.post("/signup", signupPost);

router.post("/login", loginPost);

router.post("/token", refreshToken);

router.post("/logout", logoutPost);

export default router;
