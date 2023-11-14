const router = require("express").Router();
const { registerSchema } = require("./model");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const validation = require("../middleware/validation");
const {
  getLoggeronUser,
  getLoggeronUsers,
  updatedUser,
  deleteUser,
  followAndDisFollow,
  getLoggedOnUser,
} = require("./controller");

router.get(
  "/",
  authentication(),
  authorization("isContentEditor", "isAdmin"),
  getLoggeronUsers
);

router.get("/me", authentication(), getLoggedOnUser);

router.get(
  "/:id",
  authentication(),
  authorization("isContentEditor", "isAdmin", "acountOwner"),
  getLoggeronUser
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
