const router = require("express").Router();
const { registerSchema } = require("./model");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const validation = require("../middleware/validation");
const {
  getUsers,
  updatedUser,
  deleteUser,
  getLoggedOnUser,
  getUser,
  followAndDisFollow,
  switchEditorStatus,
} = require("./controller");

router.get(
  "/",
  authentication(),
  getUsers
);

router.get("/me", authentication(), getLoggedOnUser);

router.get(
  "/:id",
  authentication(),
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
router.patch('/acount/:id', authentication(), switchEditorStatus)
module.exports = router;
