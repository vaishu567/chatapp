const mongoose = require("mongoose");

const messageModel = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    content: {
      type: mongoose.Schema.Types.String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageModel);
