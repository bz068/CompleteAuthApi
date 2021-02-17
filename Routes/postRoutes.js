const router = require("express").Router();
const auth = require("../middleware/auth");
const Post = require("../Models/postModel");

router.post("/", auth, async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ errorMessage: "Please Enter All Fields." });
    }

    newPost = new Post({
      title,
      body,
    });

    const savedPost = await newPost.save();

    res.status(200).json({ msg: "Post Added" });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const allPosts = await Post.find();

    res.json(allPosts);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});
module.exports = router;
