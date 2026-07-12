const express = require("express");
const router = express.Router();

const {
  createSlot,
  getAllSlots,
  getSlotById,
  updateSlot,
  deleteSlot,
} = require("../controllers/slotController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// Public Routes
router.get("/", getAllSlots);
router.get("/:id", getSlotById);

// Protected Routes
router.post(
  "/",
  protect,
  authorizeRoles("ADMIN", "ORGANIZER"),
  createSlot
);

router.put(
  "/:id",
  protect,
  authorizeRoles("ADMIN", "ORGANIZER"),
  updateSlot
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("ADMIN"),
  deleteSlot
);

module.exports = router;