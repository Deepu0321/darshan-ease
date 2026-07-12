const Temple = require("../models/Temple");
const DarshanSlot = require("../models/DarshanSlot");
const Booking = require("../models/Booking");

// =============================
// Organizer Dashboard
// =============================
const getOrganizerDashboard = async (req, res) => {
  try {
    const totalTemples = await Temple.countDocuments();

    const totalSlots = await DarshanSlot.countDocuments();

    const totalBookings = await Booking.countDocuments({
      bookingStatus: "BOOKED",
    });

    const cancelledBookings = await Booking.countDocuments({
      bookingStatus: "CANCELLED",
    });

    res.status(200).json({
      success: true,
      dashboard: {
        totalTemples,
        totalSlots,
        totalBookings,
        cancelledBookings,
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
  getOrganizerDashboard,
};