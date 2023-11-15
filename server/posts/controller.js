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
    const { user, search} = req.query;
    let posts = [];
    if(user){ posts = await Post.find({ user_id: user }).select("-__v")}
    if (search) {
      const searchRegex = new RegExp(search, "i"); 
      posts = await Post.find({
        $or: [
          { title: { $regex: searchRegex } },
          { description: { $regex: searchRegex } },
        ],
      });
    }
    if(!search && !user){
      posts = await Post.find()
    }       
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
      image: req.body?.image, 
      user_id: req.user._id,
    });
    
    await post.save();

    res.send(
      _.pick(post, ["title", "description", "_id", "user_id", 'likes', "comments"])
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
      const updatedPost = await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { likes: { user_id: req.user._id } } },
        { new: true }
      ).select("-__v ");
      if (!updatedPost) {
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
    ).select("-__v ");
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
