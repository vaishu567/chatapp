const mongoose = require("mongoose");

const messageModel = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    contentType: {
      type: String,
      enum: ["Text", "Media", "Document", "Camera"],
      default: "Text",
    },
    content: {
      type: String,
      trim: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    // file: {
    //   type: String,
    // },
    // text: {
    //   type: String,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageModel);
