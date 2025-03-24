import { Router } from "express";
import { allPostsGet, postGet, postPost } from "../controllers/posts.js";
import checkAuth from "../middleware/checkAuth.js";

const router = Router();

router.get("/", allPostsGet);
router.post("/", checkAuth, postPost);
router.get("/:postId", postGet);

export default router;
