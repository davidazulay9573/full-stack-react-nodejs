const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");

const cardsSchema = new mongoose.Schema({
    bizName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  bizDescription: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  bizAddress: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 400,
  },
  bizPhone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 10,
  },
  bizImage: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 1024,
  },
  bizNumber: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 999_999_999,
    unique: true,
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
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Card = mongoose.model("Card", cardsSchema, "cards");

const generateBizNumber = async () => {
  while (true) {
    const randomNumber = _.random(1000, 999_999_999);
    const card = await Card.findOne({ bizNumber: randomNumber });
    if (!card) {
      return String(randomNumber);
    }
  }
};

const cardSchema = Joi.object({
  bizName: Joi.string().min(2).max(255).required(),
  bizDescription: Joi.string().min(2).max(1024).required(),
  bizAddress: Joi.string().min(2).max(400).required(),
  bizPhone: Joi.string()
    .min(9)
    .max(10)
    .required()
    .regex(/^0[2-9]\d{7,8}$/),
  bizImage: Joi.string().min(11).max(1024),
});

const bizNumberSchema = Joi.object({
  bizNumber: Joi.string().pattern(/^\d+$/).min(6).required(),
});

module.exports = { Card,generateBizNumber, cardSchema, bizNumberSchema };
