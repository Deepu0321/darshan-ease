const mongoose = require("mongoose");

const templeSchema = new mongoose.Schema(
  {
    templeName: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    darshanStartTime: {
      type: String,
      required: true,
    },

    darshanEndTime: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Temple", templeSchema);