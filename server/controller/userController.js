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
  try {
    const { email, password } = req.body;
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
      expiresIn: "7d",
    });
    res
      .status(200)
      .send({
        success: true,

        message: "login dan o'tdi",
        user,
      })
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 60 * 60 * 1000),
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "login controller api dan xatolik",
      error,
    });
  }
};

module.exports = { registerUser, loginController };
