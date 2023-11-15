const { Post } = require("../posts/model");
module.exports = (...authorizations) => {
  return async (req, res, next) => {
    if (authorizations.length) {
      if (
        (!authorizations.includes("acountOwner") ||
          req.user._id != req.params.id) &&
        (!authorizations.includes("postOwner") || !(await isPostOwner(req)))
      ) {
        let authorizationsCounter = 0;
        authorizations
          .filter(
            (authorization) =>
              !["acountOwner", "postOwner"].includes(authorization)
          )
          .forEach((authorization) => {
            if (req.user[authorization]) {
              authorizationsCounter++;
            }
          });

        if (!authorizationsCounter) {
          res
            .status(401)
            .send("There is no authorization for this type of account");
          return;
        }
      }
    }
    next();
  };
};

const isPostOwner = async (req) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      user_id: req.user._id,
    });
    if (!post) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};
