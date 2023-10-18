const express = require("express");
const userModel = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcrypt");

const loginController = asyncHandler(async (req, res) => {
  const { name, password } = req.body;
  const user = await userModel.findOne({ name });
  console.log("user found", user);
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json("Wrong Credentials!");
  }
  console.log("password found", match);
  if (user && match) {
    const response = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    };
    console.log(response);
    res.json("Login successful");
  } else {
    res.status(404);
    throw new Error("Invalid credentials!");
  }
});

const registerController = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //check for all fields
  if (!email || !password || !name) {
    res.send(400);
    throw new Error("Credentials are missing!");
  }
  //check for user already exist
  const userExist = await userModel.findOne({ email });
  if (userExist) {
    res.send(400);
    throw new Error("User already exists!");
  }
  //username already exists
  const usernameExists = await userModel.findOne({ name });
  if (usernameExists) {
    throw new Error("Username already exists!");
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
    res.status(400);
    throw new Error("Registration is not successful!");
  }
});

module.exports = { loginController, registerController };
