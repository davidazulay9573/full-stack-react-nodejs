const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },

  image: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 1024,
  },

  likes: [
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  comments: [
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      comment: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10024,
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Post = mongoose.model("Post", PostSchema, "posts");

const postSchema = Joi.object({
  title: Joi.string().min(2).max(255).required(),
  description: Joi.string().min(2).max(1024).required(),
});


module.exports = { Post , postSchema };
