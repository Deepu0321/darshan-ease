const Temple = require("../models/Temple");

// ==============================
// Create Temple
// ==============================
const createTemple = async (req, res) => {
  try {
    const {
      templeName,
      location,
      description,
      image,
      darshanStartTime,
      darshanEndTime,
    } = req.body;

    if (
      !templeName ||
      !location ||
      !darshanStartTime ||
      !darshanEndTime
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const temple = await Temple.create({
      templeName,
      location,
      description,
      image,
      darshanStartTime,
      darshanEndTime,
    });

    res.status(201).json({
      success: true,
      message: "Temple created successfully",
      temple,
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
// Get All Temples
// ==============================
const getAllTemples = async (req, res) => {
  try {
    const temples = await Temple.find();

    res.status(200).json({
      success: true,
      count: temples.length,
      temples,
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
// Get Single Temple
// ==============================
const getTempleById = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);

    if (!temple) {
      return res.status(404).json({
        success: false,
        message: "Temple not found",
      });
    }

    res.status(200).json({
      success: true,
      temple,
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
// Update Temple
// ==============================
const updateTemple = async (req, res) => {
  try {
    const temple = await Temple.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!temple) {
      return res.status(404).json({
        success: false,
        message: "Temple not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Temple updated successfully",
      temple,
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
// Delete Temple
// ==============================
const deleteTemple = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);

    if (!temple) {
      return res.status(404).json({
        success: false,
        message: "Temple not found",
      });
    }

    await temple.deleteOne();

    res.status(200).json({
      success: true,
      message: "Temple deleted successfully",
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
  createTemple,
  getAllTemples,
  getTempleById,
  updateTemple,
  deleteTemple,
};
