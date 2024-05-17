const express = require("express");
const {
  registerUser,
  loginController,
  alluser,
  refreshToken,
} = require("../controller/userController");
const { isAuthenticated } = require("../middlware/auth");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginController);
router.get("/users", isAuthenticated, alluser);
router.post("/refresh", isAuthenticated, refreshToken, alluser);
module.exports = router;
