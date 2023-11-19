const { User } = require("../users/model");
const sendError = require("../utils/sendError");
const bcrypt = require("bcrypt");
const _ = require("lodash");

async function signUp(req, res) {
  try {
    if (await User.findOne({ email: req.body.email })) {
      sendError(res, 401, "User already registered");
      return;
    }

    const user = new User({
      ...req.body,
      image:
      
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    });
    user.password = await bcrypt.hash(user.password, 12);
    await user.save();

    res.send(_.pick(user, ["_id", "name", "email", "isContentEditor"]));
  } catch (error) {
    sendError(res, 500, `dbError: ${error.message} `);
  }
}

async function signIn(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      sendError(res, 401, "Invalid email or password");
      return;
    }

    const blockTo = Math.round(

      (user.blockTime -  Date.now()) / (1000 * 60 * 60)
    );
    if (blockTo > 0) {
      sendError(res, 401, `The account is blocked for another ${blockTo} hours`);
      return;
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isValidPassword) {
      await user.updateOne({ loginAttempts: user.loginAttempts + 1 });
      if (user.loginAttempts >= 3) {
        await blockUser(user);
        await user.updateOne({ loginAttempts: 0 });
        sendError(res, 401, "Your account is blocked for 24 hours");
        return;
      }
      sendError(res, 401, "Invalid email or password");
      return;
    }

    await user.updateOne({ loginAttempts: 0 });
    const token = user.generateAuthToken();
    res.send({ token });
  } catch (error) {
    sendError(res, 500, `dbError: ${error.message} `);
  }
}

const blockUser = async (user) => {
  await user.updateOne({
    blockTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    loginAttempts: 0,
  });
};

module.exports = { signIn, signUp };
