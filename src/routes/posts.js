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
import {
  allCommentsGet,
  commentDelete,
  commentPost,
  commentPut,
} from "../controllers/comments.js";

const router = Router();

router.get("/", allPostsGet);
router.post("/", checkAuth, postPost);
router.get("/:postId", postGet);
router.put("/:postId/title", checkAuth, postTitlePut);
router.put("/:postId/content", checkAuth, postContentPut);
router.delete("/:postId", checkAuth, postDelete);

router.get("/:postId/comments", checkAuth, allCommentsGet);
router.post("/:postId/comments", checkAuth, commentPost);
router.put("/:postId/comments/:commentId", checkAuth, commentPut);
router.delete("/:postId/comments/:commentId", checkAuth, commentDelete);

export default router;
