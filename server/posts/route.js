const router = require("express").Router();
const { postSchema } = require("./model");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const validation = require("../middleware/validation");
const {
  getPost,
  getPosts,
  getLikedPosts,
  updatedPost,
  deletePost,
  LikeAndDisLike,
  createPost,
} = require("./controller");

router.get("/", getPosts);
router.get("/liked", getLikedPosts);
router.post(
  "/",
  authentication(),
  authorization("isContentEditor", "isAdmin"),
  validation(postSchema),
  createPost
);

router.get("/:id", authentication(), getPost);

router.put(
  "/:id",
  authentication(),
  authorization("postOwner"),
  validation(postSchema),
  updatedPost
);

router.delete(
  "/:id",
  authentication(),
  authorization("isAdmin", "postOwner"),
  deletePost
);

router.patch("/:id", authentication(), LikeAndDisLike);

module.exports = router;
