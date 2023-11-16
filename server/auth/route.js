const router = require("express").Router();
const { loginSchema, registerSchema } = require("../users/model");
const validation = require("../middleware/validation");
const { signUp, signIn } = require("./controller");

router.post("/auth/sign-up", validation(registerSchema), signUp);

router.post("/auth/sign-in", validation(loginSchema), signIn);

module.exports = router;
