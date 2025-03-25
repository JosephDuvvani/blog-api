import { Router } from "express";
import {
  allPostsGet,
  postContentPut,
  postDelete,
  postGet,
  postPost,
  postTitlePut,
} from "../controllers/posts.js";
import checkAuth from "../middleware/checkAuth.js";

const router = Router();

router.get("/", allPostsGet);
router.post("/", checkAuth, postPost);
router.get("/:postId", postGet);
router.put("/:postId/title", checkAuth, postTitlePut);
router.put("/:postId/content", checkAuth, postContentPut);
router.delete("/:postId", checkAuth, postDelete);

export default router;
