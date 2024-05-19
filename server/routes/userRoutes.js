const express = require("express");
const {
  registerUser,
  loginController,
  alluser,

  refReshToken,
  oneUser,
} = require("../controller/userController");
const { isAuthenticated } = require("../middlware/auth");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginController);
router.get("/users", isAuthenticated, alluser);
router.get("/userone/:id", isAuthenticated, oneUser);
router.get("/refresh", isAuthenticated, refReshToken, alluser);
module.exports = router;
