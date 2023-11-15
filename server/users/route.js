const router = require("express").Router();
const { registerSchema } = require("./model");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const validation = require("../middleware/validation");
const {
  getUsers,
  updatedUser,
  deleteUser,
  followAndDisFollow,
  getLoggedOnUser,
  getUser,
} = require("./controller");

router.get(
  "/",
  authentication(),
  authorization("isContentEditor", "isAdmin"),
  getUsers
);

router.get("/me", authentication(), getLoggedOnUser);

router.get(
  "/:id",
  authentication(),
  authorization("isContentEditor", "isAdmin", "acountOwner"),
  getUser
);

router.put(
  "/:id",
  authentication(),
  authorization("isAdmin", "acountOwner"),
  validation(registerSchema),
  updatedUser
);

router.delete(
  "/:id",
  authentication(),
  authorization("isAdmin", "acountOwner"),
  deleteUser
);

router.patch("/:id", authentication(), followAndDisFollow);

module.exports = router;
