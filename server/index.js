const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database is connected successfully!");
  } catch (error) {
    console.log(error);
  }
};

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/message", messageRoute);

const PORT = 5000 || process.env.PORT;
const server = app.listen(PORT, () => {
  connectDB();
  console.log("Server listening on port " + PORT);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
  pingTimeout: 60000,
});

io.on("connection", (socket) => {
  console.log("socket.io connection established");

  socket.on("setup", (user) => {
    socket.join(user.data._id);
    console.log("server://joined user:", user.data._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined Room:", room);
  });

  socket.on("new message", (newMessageStatus) => {
    var chat = newMessageStatus.chat;
    if (!chat.users) {
      return console.log("chat.users not defined");
    }
  });
});
