const express = require("express");
const userModel = require("../model/userModel");

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

    await userModel.create(req.body);
    res.status(201).send({
      success: true,
      message: "foydalanuvchi qo'shildi",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "register controller api dan xatolik",
    });
  }
};

module.exports = { registerUser };
