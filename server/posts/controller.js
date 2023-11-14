const { Post } = require("./model");
const sendError = require("../utils/sendError");
const _ = require("lodash");

async function getPost(req, res) {
  try {
    const post = await Post.findById(req.params.id).select("-__v ");
    if (!post) {
      sendError(res, 404, "The post with the given ID was not found");
      return;
    }
    res.send(post);
  } catch (error) {
    if (error.path === "_id") {
      sendError(res, 404, "The post with the given ID was not found");
      return;
    }
    sendError(res, 500, `dbError: ${error.message} `);
  }
}

async function getPosts(req, res) {
  try {
    const { user } = req.query;
    const posts = user
      ? await Post.find({ user_id: user }).select("-__v")
      : await Post.find().select("-__v");
    if (!posts.length) {
      res.send([]);
      return;
    }
    res.send(posts);
  } catch (error) {
    sendError(res, 500, `dbError: ${error.message} `);
  }
}

async function getLikedPosts(req, res){
  try {
    const posts = await Post.find({
      likes: { $elemMatch: { user_id: req.user._id } },
    }).select("-__v");
    if (!posts.length) {
      res.send([]);
      return;
    }
    res.send(posts);
  } catch (error) {
    sendError(res, 500, `dbError: ${error.message} `);
  }
}

async function createPost(req, res) {
  try {
    const post = new Post({
      ...req.body,
      image:
        req.body.image ||
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      user_id: req.user._id,
    });
    
    await post.save();

    res.send(
      _.pick(post, ["title", "description", "_id", "user_id",])
    );
  } catch (error) {
    sendError(res, 500, `dbError: ${error.message} `);
  }
}

async function updatedPost(req, res) {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    ).select("-__v -bizNumber");
    if (!post) {
      sendError(res, 404, "The post with the given ID was not found");
      return;
    }
    res.send(post);
  } catch (error) {
    if (error.path == "_id") {
      sendError(res, 404, "The post with the given ID was not found");
      return;
    }
    sendError(res, 500, `dbError: ${error.message} `);
  }
}

async function deletePost(req, res) {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id });
    if (!post) {
      sendError(res, 404, "The post with the given ID was not found");
      return;
    }
    res.send("the post deleted successfully");
  } catch (error) {
    if (error.path === "_id") {
      sendError(res, 404, "The post with the given ID was not found");
      return;
    }
    sendError(res, 500, `dbError: ${error.message} `);
  }
}

async function LikeAndDisLike(req, res) {
  try {
    const isLiked = await Post.findOne({
      _id: req.params.id,
      "likes.user_id": req.user._id,
    });

    if (isLiked) {
      const updatedpost = await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { likes: { user_id: req.user._id } } },
        { new: true }
      ).select("-__v -bizNumber");
      if (!updatedpost) {
        sendError(res, 404, "The post with the given ID was not found");
        return;
      }
      res.send(updatedPost.likes);
      return;
    }
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { likes: { user_id: req.user._id } } },
      { new: true }
    ).select("-__v -bizNumber");
    if (!post) {
      sendError(res, 404, "The post with the given ID was not found");
      return;
    }
    res.send(post.likes);
  } catch (error) {
    if (error.path === "_id") {
      sendError(res, 404, "The post with the given ID was not found");
      return;
    }
    sendError(res, 500, `dbError: ${error.message} `);
  }
}

module.exports = {
  getPost,
  getPosts,
  getLikedPosts,
  updatedPost,
  deletePost,
  LikeAndDisLike,
  createPost,
};
