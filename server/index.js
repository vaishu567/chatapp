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
const AudioCall = require("./model/audioCallModel");

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

  // Handle audio call socket events:

  // Start audio call
  socket.on("start_audio_call", async (data) => {
    const { senderId, receiverId, roomID } = data;
    const to_user = await User.findById(receiverId);
    const from_user = await User.findById(senderId);

    console.log("to_user", to_user);

    // send notification to receiver of call
    io.to(to_user?.socket_id).emit("audio_call_notification", {
      from: from_user,
      roomID,
      streamID: senderId,
      userID: receiverId,
      userName: receiverId,
    });

    // Create a new audio call entry in the database
    const audioCall = await AudioCall.create({
      users: [senderId, receiverId],
      sender: senderId,
      receiver: receiverId,
      callStatus: "Pending", // You might want to change this based on your requirements
    });

    // Emit an event to the sender and receiver to notify them of the call
    io.to(senderId).emit("audio_call_request", { audioCall });
    io.to(receiverId).emit("audio_call_request", { audioCall });
  });

  // handle audio_call_not_picked
  socket.on("audio_call_not_picked", async (data) => {
    console.log(data);
    // find and update call record
    const { senderId, receiverId } = data;

    const to_user = await User.findById(receiverId);

    await AudioCall.findOneAndUpdate(
      {
        participants: { $size: 2, $all: [receiverId, senderId] },
      },
      { verdict: "Missed", status: "Ended", endedAt: Date.now() }
    );
    // TODO => emit call_missed to receiver of call
    io.to(to_user?.socket_id).emit("audio_call_missed", {
      senderId,
      receiverId,
    });
  });

  // handle audio_call_accepted
  socket.on("audio_call_accepted", async (data) => {
    const { senderId, receiverId } = data;

    const from_user = await User.findById(senderId);

    // find and update call record
    await AudioCall.findOneAndUpdate(
      {
        participants: { $size: 2, $all: [receiverId, senderId] },
      },
      { verdict: "Accepted" }
    );

    // TODO => emit call_accepted to sender of call
    io.to(from_user?.socket_id).emit("audio_call_accepted", {
      senderId,
      receiverId,
    });
  });

  // handle audio_call_denied
  socket.on("audio_call_denied", async (data) => {
    // find and update call record
    const { senderId, receiverId } = data;

    await AudioCall.findOneAndUpdate(
      {
        participants: { $size: 2, $all: [receiverId, senderId] },
      },
      { verdict: "Denied", status: "Ended", endedAt: Date.now() }
    );

    const from_user = await User.findById(senderId);
    // TODO => emit call_denied to sender of call

    io.to(from_user?.socket_id).emit("audio_call_denied", {
      senderId,
      receiverId,
    });
  });

  // handle user_is_busy_audio_call
  socket.on("user_is_busy_audio_call", async (data) => {
    const { senderId, receiverId } = data;

    // find and update call record
    await AudioCall.findOneAndUpdate(
      {
        participants: { $size: 2, $all: [receiverId, senderId] },
      },
      { verdict: "Busy", status: "Ended", endedAt: Date.now() }
    );

    const from_user = await User.findById(senderId);
    // TODO => emit on_another_audio_call to sender of call
    io.to(from_user?.socket_id).emit("on_another_audio_call", {
      senderId,
      receiverId,
    });
  });
});
