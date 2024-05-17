const express = require("express");
const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(404).send({
        success: false,
        message: "maydonni toliq toldiring",
      });
    }
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(404).send({
        success: true,
        message: "bu odan royxatdan otgan",
      });
    }
    //  parolni shifrlash
    let salt = bcrypt.genSaltSync(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      userName,
      email,
      password: passwordHash,
    });
    res.status(201).send({
      success: true,
      message: "foydalanuvchi qo'shildi",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "register controller api dan xatolik",
    });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "maydonni to'liq toldiring",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "bu foydalanuvchi tizimda yo'q",
      });
    }
    // parolni tekshirirsh
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "xato parol",
      });
    }
    // token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(token);
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 100),
    });

    res.status(200).send({
      success: true,
      message: "login dan o'tdi",
      user,
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      message: "login controller api dan xatolik",
      error,
    });
  }
};
const alluser = async (req, res) => {
  try {
    const users = await userModel.find({});
    if (!users) {
      return res.status(404).send({
        success: false,
        message: "foydalanuvchilar yo'q",
      });
    }
    res.status(200).send({
      success: true,
      message: "success",
      foydalanuvchilar_soni: users.length,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "alluser controller apidan xatolik",
      error,
    });
  }
};
const refreshToken = async (req, res) => {
  const refreshT = req.cookies.token;
  if (!refreshT) {
    return res.status(401).send({
      success: false,
      message: "refresh token yoq",
    });
  }
  try {
    const decoded = jwt.verify(refreshT, process.env.JWT_SECRET);
    const accessToken = jwt.sign(
      { id: decoded.user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.cookie(user.id, accessToken, {
      expires: new Date(Date.now() + 1000 * 30),
      httpOnly: true,
    });
    res.status(200).send({ accessToken });
  } catch (error) {
    console.log(error);
    res.status(403).send({
      success: false,
      message: "xato refresh token",
      error,
    });
  }
};
// const refreshToken = (req, res, next) => {
//   const cookies = req.headers.cookie;
//   const prevToken = cookies.split("=")[1];
//   if (!prevToken) {
//     return res.status(400).send({
//       success: false,
//       message: "Couldn't find token",
//     });
//   }
//   jwt.verify(prevToken, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       console.log(err);
//       return res.status(403).send({
//         message: "Authentication faild",
//       });
//     }
//     res.clearCookie(` ${user.id} `);
//     req.cookies[`${user.id}`] = "";
//     token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });
//     res.cookie(String(user.id), token, {
//       path: "/",
//       expires: new Date(Date.now() + 1000 * 30),
//       httpOnly: true,
//       sameSite: "lax",
//     });
//     req.id = user.id;
//     next();
//   });
// };

module.exports = { registerUser, loginController, alluser, refreshToken };
