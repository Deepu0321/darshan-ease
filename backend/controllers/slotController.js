const DarshanSlot = require("../models/DarshanSlot");

// ==============================
// Create Slot
// ==============================
const createSlot = async (req, res) => {
  try {
    const {
      temple,
      date,
      startTime,
      endTime,
      totalSeats,
      availableSeats,
      price,
    } = req.body;

    if (
      !temple ||
      !date ||
      !startTime ||
      !endTime ||
      !totalSeats ||
      availableSeats === undefined ||
      price === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const slot = await DarshanSlot.create({
      temple,
      date,
      startTime,
      endTime,
      totalSeats,
      availableSeats,
      price,
    });

    res.status(201).json({
      success: true,
      message: "Darshan slot created successfully",
      slot,
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
// Get All Slots
// ==============================
const getAllSlots = async (req, res) => {
  try {
    const slots = await DarshanSlot.find().populate("temple");

    res.status(200).json({
      success: true,
      count: slots.length,
      slots,
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
// Get Slot By ID
// ==============================
const getSlotById = async (req, res) => {
  try {
    const slot = await DarshanSlot.findById(req.params.id).populate("temple");

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Slot not found",
      });
    }

    res.status(200).json({
      success: true,
      slot,
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
// Update Slot
// ==============================
const updateSlot = async (req, res) => {
  try {
    const slot = await DarshanSlot.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Slot not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Slot updated successfully",
      slot,
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
// Delete Slot
// ==============================
const deleteSlot = async (req, res) => {
  try {
    const slot = await DarshanSlot.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Slot not found",
      });
    }

    await slot.deleteOne();

    res.status(200).json({
      success: true,
      message: "Slot deleted successfully",
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
  createSlot,
  getAllSlots,
  getSlotById,
  updateSlot,
  deleteSlot,
};