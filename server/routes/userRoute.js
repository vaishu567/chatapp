const express = require("express");
const router = express.Router();
const {
  loginController,
  registerController,
  logoutController,
  fetchAllUsersController,
  generateZegoToken,
  startAudioCall,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/logout", logoutController);
router.get("/fetchUsers", protect, fetchAllUsersController);
router.post("/generate-zego-token", generateZegoToken);
router.post("/start-audio-call", startAudioCall);

module.exports = router;
