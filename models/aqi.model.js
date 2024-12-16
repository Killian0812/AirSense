const mongoose = require("mongoose");

const aqiSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  aqi: {
    type: Number,
    required: true,
  },
  recordedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AQI", aqiSchema);
