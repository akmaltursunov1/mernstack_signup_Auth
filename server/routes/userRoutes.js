const express = require("express");
const { registerUser } = require("../controller/userController");
const router = express.Router();

router.use("/register", registerUser);

module.exports = router;
