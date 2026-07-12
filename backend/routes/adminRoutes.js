const express = require("express");
const router = express.Router();

const {
  getAdminDashboard,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// Admin Dashboard
router.get(
  "/dashboard",
  protect,
  authorizeRoles("ADMIN"),
  getAdminDashboard
);

module.exports = router;