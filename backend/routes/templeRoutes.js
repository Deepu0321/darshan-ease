const express = require("express");
const router = express.Router();

const {
  createTemple,
  getAllTemples,
  getTempleById,
  updateTemple,
  deleteTemple,
} = require("../controllers/templeController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// Public Routes
router.get("/", getAllTemples);
router.get("/:id", getTempleById);

// Protected Routes (Admin & Organizer)
router.post(
  "/",
  protect,
  authorizeRoles("ADMIN", "ORGANIZER"),
  createTemple
);

router.put(
  "/:id",
  protect,
  authorizeRoles("ADMIN", "ORGANIZER"),
  updateTemple
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("ADMIN"),
  deleteTemple
);

module.exports = router;