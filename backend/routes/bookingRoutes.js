const express = require("express");
const router = express.Router();

const {
  bookDarshan,
  getMyBookings,
  cancelBooking,
} = require("../controllers/bookingController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, bookDarshan);

router.get("/my-bookings", protect, getMyBookings);

router.put("/cancel/:id", protect, cancelBooking);

module.exports = router;