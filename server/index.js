const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");

const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database is connected successfully!");
  } catch (error) {
    console.log(error);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Define the upload directory
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + fileExtension);
  },
});

const upload = multer({ storage });

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/message", messageRoute);
// Handle POST requests for file uploads
app.post("/upload", upload.single("file"), async (req, res) => {
  const { content, chatId, contentType } = req.body;
  const { file } = req;
  if (!file) {
    return res.status(400).json({ message: "No file uploaded." });
  }
  try {
    let fileUrl;
    if (file) {
      fileUrl = `/uploads/${file.filename}`;
    }
    const newMessage = await Message.create({
      sender: req.user._id, // Assuming you have middleware to authenticate the user
      content,
      chat: chatId,
      contentType,
      file: fileUrl,
    });
    // Broadcast the new message to the chat room
    io.to(chatId).emit("newMessage", newMessage);
    res.status(200).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  // const fileUrl = `/uploads/${req.file.filename}`; // Path to the uploaded file
  // res.status(200).json({ fileUrl });
});

app.use("/uploads", express.static("uploads"));

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
    // console.log("User joined Room:", room);
  });

  socket.on("newMessage", (newMessageStatus) => {
    var chat = newMessageStatus.chat;
    if (!chat.users) {
      return console.log("chat.users not defined");
    }
    // console.log(newMessageStatus);
    const messageData = newMessageStatus;
    chat.users.forEach((user) => {
      if (user._id === newMessageStatus.sender._id) return;
      socket.in(user._id).emit("message received", messageData);
      console.log("message received", messageData);
    });
  });

  // socket.on("file_message", (data) => {
  //   console.log("Received file message", data);

  //   // data:{to,from,text,file}

  //   // get the file extension
  //   const fileExtension = path.extname(data.file.name);

  //   // generate a unique filename
  //   const fileName = `${Date.now()}_${Math.floor(
  //     Math.random() * 1000
  //   )}${fileExtension}`;

  //   // upload file to AWS s3
  // });
});
