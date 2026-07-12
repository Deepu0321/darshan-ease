const express = require("express");
const router = express.Router();

const {
  createDonation,
  getMyDonations,
  getAllDonations,
  getDonationStats,
} = require("../controllers/donationController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// User Routes
router.post("/", protect, createDonation);

router.get("/my", protect, getMyDonations);

// Admin Routes
router.get("/", protect, authorizeRoles("ADMIN"), getAllDonations);

router.get(
  "/stats",
  protect,
  authorizeRoles("ADMIN"),
  getDonationStats
);

module.exports = router;