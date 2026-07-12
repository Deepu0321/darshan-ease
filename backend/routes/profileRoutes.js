const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/profileController");

const { protect } = require("../middleware/authMiddleware");

// Get Logged-in User Profile
router.get("/", protect, getProfile);

// Update Profile
router.put("/", protect, updateProfile);

// Change Password
router.put("/change-password", protect, changePassword);

module.exports = router;