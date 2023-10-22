const express = require("express");
const userModel = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcrypt");

const loginController = asyncHandler(async (req, res) => {
  const { name, password } = req.body;
  const user = await userModel.findOne({ name });
  if (!user) {
    return res.status(404).json("User not found!");
  }
  console.log("user found", user);
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json("Wrong Credentials!");
  }
  console.log("password found", match);
  if (user && match) {
    const token = generateToken(user._id);
    const response = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
    };
    res.cookie("token", token).status(200).json(response);
    console.log(response);
    res.json("Login successful");
  } else {
    res.status(404);
    throw new Error("Invalid credentials!");
  }
});

const logoutController = asyncHandler(async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .send("User logged out successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
});

const registerController = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //check for all fields
  if (!email || !password || !name) {
    res.status(400);
    throw new Error("Credentials are missing!");
  }
  //check for user already exist
  const userExist = await userModel.findOne({ email });
  if (userExist) {
    return res.status(405).json("Please use unique Email!");
  }
  //username already exists
  const usernameExists = await userModel.findOne({ name });
  if (usernameExists) {
    return res.status(406).json("Username already exists!");
  }
  //create an entry of the user in the database
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hash Password: ", hashedPassword);
  if (hashedPassword) {
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    console.log(`User created: ${savedUser}`);
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    }
  } else {
    return res.status(400).json("Registration is not successful!");
  }
});

const fetchAllUsersController = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await userModel.find(keyword).find({
    _id: { $ne: req.user._id },
  });
  res.send(users);
});

module.exports = {
  loginController,
  registerController,
  logoutController,
  fetchAllUsersController,
};
