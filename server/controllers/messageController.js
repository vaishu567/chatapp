const asyncHandler = require("express-async-handler");
const Message = require("../model/messageModel");
const User = require("../model/userModel");
const Chat = require("../model/chatModel");

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name email")
      .populate("receiver")
      .populate("content")
      .populate("contentType")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  const { content, contentType, chatId } = req.body;
  if (!content || !contentType || !chatId) {
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    contentType: contentType,
    chat: chatId,
  };
  // console.log(newMessage);

  try {
    var message = await Message.create(newMessage);
    console.log(message);

    message = await message.populate("sender", "name");
    message = await message.populate("content");
    message = await message.populate("chat");
    message = await message.populate("contentType");
    message = await message.populate("receiver");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    // console.log(message);
    res.json(message);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

module.exports = { allMessages, sendMessage };
