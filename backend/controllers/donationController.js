const Donation = require("../models/Donation");

// ======================================
// Donate to Temple
// ======================================
const createDonation = async (req, res) => {
  try {
    const {
      temple,
      amount,
      paymentMethod,
      transactionId,
      message,
    } = req.body;

    if (!temple || !amount) {
      return res.status(400).json({
        success: false,
        message: "Temple and amount are required",
      });
    }

    const donation = await Donation.create({
      user: req.user.id,
      temple,
      amount,
      paymentMethod,
      paymentStatus: "SUCCESS",
      transactionId,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Donation successful",
      donation,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================
// My Donations
// ======================================
const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({
      user: req.user.id,
    }).populate("temple");

    res.status(200).json({
      success: true,
      count: donations.length,
      donations,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================
// All Donations (Admin)
// ======================================
const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("user")
      .populate("temple");

    res.status(200).json({
      success: true,
      count: donations.length,
      donations,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================
// Donation Statistics
// ======================================
const getDonationStats = async (req, res) => {
  try {
    const donations = await Donation.find({
      paymentStatus: "SUCCESS",
    });

    const totalAmount = donations.reduce(
      (sum, donation) => sum + donation.amount,
      0
    );

    res.status(200).json({
      success: true,
      totalDonations: donations.length,
      totalAmount,
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
  createDonation,
  getMyDonations,
  getAllDonations,
  getDonationStats,
};