const User = require("../models/User");
const Temple = require("../models/Temple");
const DarshanSlot = require("../models/DarshanSlot");
const Booking = require("../models/Booking");
const Donation = require("../models/Donation");

// ==============================
// Admin Dashboard
// ==============================
const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "USER" });
    const totalOrganizers = await User.countDocuments({ role: "ORGANIZER" });
    const totalAdmins = await User.countDocuments({ role: "ADMIN" });

    const totalTemples = await Temple.countDocuments();
    const totalSlots = await DarshanSlot.countDocuments();

    const totalBookings = await Booking.countDocuments({
      bookingStatus: "BOOKED",
    });

    const cancelledBookings = await Booking.countDocuments({
      bookingStatus: "CANCELLED",
    });

    const totalDonations = await Donation.countDocuments({
      paymentStatus: "SUCCESS",
    });

    const donations = await Donation.find({
      paymentStatus: "SUCCESS",
    });

    const totalDonationAmount = donations.reduce(
      (sum, donation) => sum + donation.amount,
      0
    );

    res.status(200).json({
      success: true,
      dashboard: {
        totalUsers,
        totalOrganizers,
        totalAdmins,
        totalTemples,
        totalSlots,
        totalBookings,
        cancelledBookings,
        totalDonations,
        totalDonationAmount,
      },
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

module.exports = {
  getAdminDashboard,
};