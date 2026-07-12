const Booking = require("../models/Booking");
const DarshanSlot = require("../models/DarshanSlot");

// ==============================
// Book Darshan
// ==============================
const bookDarshan = async (req, res) => {
  try {
    const { temple, slot, numberOfPersons } = req.body;

    const slotData = await DarshanSlot.findById(slot);

    if (!slotData) {
      return res.status(404).json({
        success: false,
        message: "Darshan Slot not found",
      });
    }

    if (slotData.availableSeats < numberOfPersons) {
      return res.status(400).json({
        success: false,
        message: "Not enough seats available",
      });
    }

    const totalAmount = slotData.price * numberOfPersons;

    const booking = await Booking.create({
      user: req.user.id,
      temple,
      slot,
      numberOfPersons,
      totalAmount,
      paymentStatus: "PENDING",
    });

    // Reduce available seats
    slotData.availableSeats -= numberOfPersons;

    if (slotData.availableSeats === 0) {
      slotData.status = "FULL";
    }

    await slotData.save();

    res.status(201).json({
      success: true,
      message: "Darshan booked successfully",
      booking,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// My Bookings
// ==============================
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
    })
      .populate("temple")
      .populate("slot");

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Cancel Booking
// ==============================
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.bookingStatus === "CANCELLED") {
      return res.status(400).json({
        success: false,
        message: "Booking already cancelled",
      });
    }

    booking.bookingStatus = "CANCELLED";

    await booking.save();

    // Restore seats
    const slot = await DarshanSlot.findById(booking.slot);

    slot.availableSeats += booking.numberOfPersons;
    slot.status = "AVAILABLE";

    await slot.save();

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
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
  bookDarshan,
  getMyBookings,
  cancelBooking,
};