const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Import Routes
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const templeRoutes = require("./routes/templeRoutes");
const slotRoutes = require("./routes/slotRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const donationRoutes = require("./routes/donationRoutes");
const organizerRoutes = require("./routes/organizerRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Error Middleware
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// =======================
// Middleware
// =======================
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// =======================
// Home Route
// =======================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to DarshanEase Backend API 🚩",
  });
});

// =======================
// API Routes
// =======================
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/temples", templeRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/organizer", organizerRoutes);
app.use("/api/admin", adminRoutes);

// =======================
// 404 Route
// =======================
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

// =======================
// Global Error Handler
// =======================
app.use(errorHandler);

module.exports = app;