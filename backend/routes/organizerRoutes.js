const express = require("express");
const router = express.Router();

const {
  getOrganizerDashboard,
} = require("../controllers/organizerController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// Organizer Dashboard
router.get(
  "/dashboard",
  protect,
  authorizeRoles("ORGANIZER"),
  getOrganizerDashboard
);

module.exports = router;