const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../modules/Profile");
const User = require("../../modules/User");
const Post = require("../../modules/Post");
const { check, validationResult } = require("express-validator");
const config = require("config");

// @route    Post api/posts
// @desc     Create a post
// @access   private
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById({ _id: req.user.id }).select(
        "-password"
      );
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });
      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.log(err);
      res.status(500).json("Server Error");
    }
  }
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

// @route    GET api/posts/:post_id
// @desc     Get post by post ID
// @access   Private

router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    if (error.kind === "ObjectId") {
      console.log(error.kind);
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).json("Server Error");
  }
});

// @route    DELETE api/posts/:post_id
// @desc     DELETE post by post ID
// @access   Private

router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    //Check user
    console.log(post.user);
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorize" });
    }
    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      console.log(error.kind);
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).json("Server Error");
  }
});

// @route    PUSH api/posts/like/:id
// @desc     Push like by to post
// @access   Private

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post);
    //check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
});

// @route    PUSH api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }
    //Get remove index
    const indexToDel = post.likes.map(item => item.user).indexOf(req.user.id);

    post.likes.splice(indexToDel, 1);

    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
});

// @route    PUSH api/posts/comment/:id
// @desc     Push comment to post
// @access   Private

router.put(
  "/comment/:id",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() });
      }
      const post = await Post.findById(req.params.id).populate("user", [
        "name",
        "avatar"
      ]);
      const user = await User.findById(req.user.id);
      const newComment = {
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar
      };
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.log(error);
      if (error.kind === "ObjectId") {
        return res.status(400).json({ msg: "Post not found" });
      }
      res.status(500).json("Server Error");
    }
  }
);

// @route    DELETE api/posts/:post_id/comment/:comment_id
// @desc     remove comment to a post
// @access   Private

router.delete("/:post_id/comment/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    //pull out comment
    const comment = await post.comments.find(
      cmt => cmt.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(400).json({ msg: "Comment not found" });
    }
    //check user

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    //Get remove index
    const indexToDel = post.comments
      .map(item => item.user)
      .indexOf(req.params.comment_id);

    post.comments.splice(indexToDel, 1);

    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "Post not found" });
    }
    res.status(500).json("Server Error");
  }
});

module.exports = router;
