import models from "../models/index.js";

const allCommentsGet = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await models.Post.find(postId);

    if (!post)
      return res.status(404).json({ errors: [{ msg: "Post Not Found" }] });

    const comments = await models.Comment.findMany(postId);

    return res.json({ comments });
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Internal Error" }] });
  }
};

const commentPost = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  const authorId = req.user.id;

  try {
    await models.Comment.create(content, postId, authorId);

    return res.status(200).json({
      message: "Comment created successfully",
      user: req.user,
    });
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Internal Error" }] });
  }
};

const commentPut = async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  try {
    await models.Comment.update(commentId, content);

    return res.status(200).json({
      message: "Comment updated successfully",
      user: req.user,
    });
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Internal Error" }] });
  }
};

const commentDelete = async (req, res) => {
  const { commentId } = req.params;

  try {
    await models.Comment.destroy(commentId);

    return res.status(200).json({
      message: "Comment deleted successfully",
      user: req.user,
    });
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Internal Error" }] });
  }
};

export { allCommentsGet, commentPost, commentPut, commentDelete };
