import { Router } from "express";
import {
  allPostsGet,
  allPublishedPostsGet,
  postContentPut,
  postDelete,
  postGet,
  postPost,
  postTitlePut,
  publishedPostGet,
  publishPut,
  unpublishPut,
} from "../controllers/posts.js";
import checkAuth from "../middleware/checkAuth.js";
import {
  allCommentsGet,
  commentDelete,
  commentPost,
  commentPut,
} from "../controllers/comments.js";
import checkAdminAuth from "../middleware/checkAdminAuth.js";

const router = Router();

router.get("/admin", checkAdminAuth, allPostsGet);
router.get("/", allPublishedPostsGet);
router.post("/", checkAdminAuth, postPost);
router.get("/:postId", publishedPostGet);
router.get("/:postId/admin", checkAdminAuth, postGet);
router.put("/:postId/publish", checkAdminAuth, publishPut);
router.put("/:postId/unpublish", checkAdminAuth, unpublishPut);
router.put("/:postId/title", checkAdminAuth, postTitlePut);
router.put("/:postId/content", checkAdminAuth, postContentPut);
router.delete("/:postId", checkAdminAuth, postDelete);

router.get("/:postId/comments", checkAuth, allCommentsGet);
router.post("/:postId/comments", checkAuth, commentPost);
router.put("/:postId/comments/:commentId", checkAuth, commentPut);
router.delete("/:postId/comments/:commentId", checkAuth, commentDelete);

export default router;
