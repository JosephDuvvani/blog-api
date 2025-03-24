import models from "../models/index.js";

const allPostsGet = async (req, res) => {
  try {
    const posts = await models.Post.findMany();
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

const postPost = async (req, res) => {
  const { title, content } = req.body;
  const { username } = req.user;

  try {
    const user = await models.User.findByUsername(username);
    if (!user)
      return res
        .status(403)
        .json({ errors: [{ msg: "Access Denied: Forbidden" }] });

    const post = await models.Post.create(title, content, user.id);
    return res.json({ post });
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Internal Error" }] });
  }
};

export { allPostsGet, postGet, postPost };
