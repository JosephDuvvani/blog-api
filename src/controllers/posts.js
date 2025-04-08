import models from "../models/index.js";

const allPostsGet = async (req, res) => {
  try {
    const posts = await models.Post.findMany();
    return res.json({ posts });
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Internal Error" }] });
  }
};

const allPublishedPostsGet = async (req, res) => {
  try {
    const posts = await models.Post.findManyPublished();
    return res.json({ posts });
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Internal Error" }] });
  }
};

const postGet = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await models.Post.find(postId);

    if (!post) return res.status(404).json({ errors: [{ msg: "Not Found" }] });
    return res.json({ post });
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Internal Error" }] });
  }
};

const publishedPostGet = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await models.Post.findPublished(postId);

    if (!post) return res.status(404).json({ errors: [{ msg: "Not Found" }] });
    return res.json({ post });
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Internal Error" }] });
  }
};

const postPost = async (req, res) => {
  try {
    const post = {
      title: 'Sample title',
      caption: 'Sample caption',
      body: {
        type: 'doc',
        content: []
      },
      author: req.user.id
    }

    const createdPost = await models.Post.create(post);
    return res.json({ createdPost });
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Internal Error" }] });
  }
};

const publishPut = async (req, res) => {
  const { postId } = req.params;

  try {
    await models.Post.publish(postId);
    return res.status(200).json({
      message: "Post published successfully",
      user: req.user,
    });
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Internal Error" }] });
  }
};

const unpublishPut = async (req, res) => {
  const { postId } = req.params;

  try {
    await models.Post.unpublish(postId);
    return res.status(200).json({
      message: "Post unpublished",
      user: req.user,
    });
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Internal Error" }] });
  }
};

const contentPut = async (req, res) => {
  const content = req.body;
  const { postId } = req.params;

  try {
    const updatedPost = await models.Post.updateContent(postId, content);
    return res.status(200).json({updatedPost});
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Internal Error" }] });
  }
};

const postDelete = async (req, res) => {
  const { postId } = req.params;

  try {
    await models.Post.destroy(postId);

    return res.status(200).json({
      message: "Post deleted successfully",
      user: req.user,
    });
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Internal Error" }] });
  }
};

export {
  allPostsGet,
  allPublishedPostsGet,
  postGet,
  publishedPostGet,
  postPost,
  publishPut,
  unpublishPut,
  contentPut,
  postDelete,
};
