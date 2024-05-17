const express = require("express");
const {
  registerUser,
  loginController,
} = require("../controller/userController");
const router = express.Router();

router.use("/register", registerUser);
router.use("/login", loginController);

module.exports = router;
