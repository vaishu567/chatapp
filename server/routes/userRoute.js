const express = require("express");
const router = express.Router();
const {
  loginController,
  registerController,
  logoutController,
  fetchAllUsersController,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/logout", logoutController);
router.get("/fetchUsers", protect, fetchAllUsersController);

module.exports = router;
