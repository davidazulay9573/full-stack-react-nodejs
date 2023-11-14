const { User } = require("./model");
const sendError = require("../utils/sendError");

async function getLoggeronUser(req, res) {
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

async function getLoggeronUsers(req, res) {
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
    const isFollow = await User.findOne({
      _id: req.params.id,
      followers: req.user._id,
    });

    if (isFollow) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { likes: { user_id: req.user._id } } },
        { new: true }
      ).select("-__v ");
      if (!updatedUser) {
        sendError(res, 404, "The post with the given ID was not found");
        return;
      }
      res.send(updatedUser.followers);
      return;
    }
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { followers: { user_id: req.user._id } } },
      { new: true }
    ).select("-__v ");
    if (!user) {
      sendError(res, 404, "The post with the given ID was not found");
      return;
    }
    res.send(user.followers);
  } catch (error) {
    if (error.path === "_id") {
      sendError(res, 404, "The post with the given ID was not found");
      return;
    }
    sendError(res, 500, `dbError: ${error.message} `);
  }
}

module.exports = {
  getLoggeronUser,
  getLoggeronUsers,
  getLoggedOnUser,
  updatedUser,
  deleteUser,
  followAndDisFollow,
};
