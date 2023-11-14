const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  isContentEditor: {
    type: Boolean,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  posts: Array,
  followers: [
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

usersSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      isContentEditor: this.isContentEditor,
      isAdmin: this.isAdmin,
      blockTime: this.blockTime,
    },
    config.get("JWT_SECRET")
  );
};

const User = mongoose.model("User", usersSchema, "users");

const registerSchema = Joi.object({
  email: Joi.string()
    .min(1)
    .max(250)
    .required()
    .email({ tlds: { allow: false } })
    .label("Email"),
  password: Joi.string()
    .min(6)
    .max(250)
    .required()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@%$#^&*\-_])(?=(.*\d){4,})[a-zA-Z!@%$#^&*\-_\d]{8,}$/
    )
    .label("Password")
    .messages({
      "string.pattern.base": `The "Password" must contain at least 8 Characters, and include 1 Upper-Case letter, 1 Lower-Case letter, 1 Special Symbol(!@%$#^&*-_) and 4 digits(0-9).`,
    }),
  name: Joi.string().min(2).max(250).required().label("Name"),
  isContentEditor: Joi.boolean().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

module.exports = { User, registerSchema, loginSchema };
