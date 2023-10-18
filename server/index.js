const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");

const app = express();
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database is connected successfully!");
  } catch (error) {
    console.log(error);
  }
};

app.use("/user", userRoute);

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
  connectDB();
  console.log("Server listening on port " + PORT);
});
