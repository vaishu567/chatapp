const {
  accessChat,
  fetchChats,
  createGroupChat,
  fetchGroups,
  groupExit,
} = require("../controllers/chatController");
const { protect } = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

router.post("/", protect, accessChat);
router.get("/", protect, fetchChats);
router.post("/createGroup", protect, createGroupChat);
router.get("/fetchGroups", protect, fetchGroups);
router.put("/groupExit", protect, groupExit);

module.exports = router;
