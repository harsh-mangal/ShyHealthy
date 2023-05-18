const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", async (req, res) => {
  console.log(req.body);

  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res
      .status(200)
      .send({ message: "User already exists", success: false });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;
  const newuser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  await newuser.save();
  res.status(200).send({ message: "User saved successfully", success: true });
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .send({ message: "Login Sucessfully", success: true, data: token });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Error logging in", error: error, success: false });
  }
});

router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    console.log(user);
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: {
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isDoctor : user.isDoctor,

        },
      });
    }
  } catch (error) {
    console.log("error logging in", error)
    res
      .status(500)
      .send({
        message: "error getting user info",
        error: error,
        success: false,
      });
  }
});

module.exports = router;
