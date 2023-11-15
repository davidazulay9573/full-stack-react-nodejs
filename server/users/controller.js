const { User } = require("./model");
const sendError = require("../utils/sendError");
const { default: mongoose } = require("mongoose");

async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id).select(
      "-password -__v -loginAttempts -blockTime -isAdmin"
    );
    if (!user) {
      sendError(res, 404, "The user with the given ID was not found");
      return;
    }
    res.send(user);
  } catch (error) {
    if (error.path === "_id") {
      sendError(res, 404, "The user with the given ID was not found");
      return;
    }
    sendError(res, 500, `dbError: ${error.message} `);
  }
}

async function getUsers(req, res) {
  try {
      const users = await User.find().select(
      "-password -__v -loginAttempts -blockTime -isAdmin"
    );
    
    res.send(users);
  } catch (error) {
    sendError(res, 500, `dbError: ${error.message} `);
  }
}

async function getLoggedOnUser(req, res) {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -__v -loginAttempts -blockTime -isAdmin"
    );
    res.send(user);
  } catch (error) {
    sendError(res, 500, `dbError: ${error.message} `);
  }
}

async function updatedUser(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );
    if (!user) {
      sendError(res, 404, "The user with the given ID was not found");
      return;
    }
    res.send(user);
  } catch (error) {
    if (error.path === "_id") {
      sendError(res, 404, "The user with the given ID was not found");
      return;
    }
    sendError(res, 500, `dbError: ${error.message} `);
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (!user) {
      sendError(res, 404, "The user with the given ID was not found");
      return;
    }

    res.send("the user deleted successfully");
  } catch (error) {
    if (error.path === "_id") {
      sendError(res, 404, "The user with the given ID was not found");
      return;
    }
    sendError(res, 500, `dbError: ${error.message} `);
  }
}
async function followAndDisFollow(req, res) {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.user._id;

    const targetUser = await User.findOne({
      _id: targetUserId,
      "followers.user_id": currentUserId,
    });

    let update;
    if (targetUser) {
      update = { $pull: { followers: { user_id: currentUserId } } };
    } else {
      update = { $addToSet: { followers: { user_id: currentUserId } } };
    }

    const updatedUser = await User.findByIdAndUpdate(targetUserId, update, {
      new: true,
      select: "-password -__v -loginAttempts -blockTime -isAdmin",
    });

    if (!updatedUser) {
      return sendError(res, 404, "User not found");
    }

    res.send(updatedUser.followers);
  } catch (error) {
    sendError(res, 500, `Database error: ${error.message}`);
  }
}

module.exports = {
  getUser,
  getUsers,
  getLoggedOnUser,
  updatedUser,
  deleteUser,
  followAndDisFollow,
};
