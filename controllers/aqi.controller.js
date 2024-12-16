const AQI = require("../models/aqi.model");

exports.getAllAqiRecords = async (req, res) => {
  try {
    const records = await AQI.find();
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAqiRecordById = async (req, res) => {
  try {
    const record = await AQI.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.status(200).json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createAqiRecord = async (req, res) => {
  const { location, aqi } = req.body;
  const newAqiRecord = new AQI({ location, aqi });
  try {
    const savedRecord = await newAqiRecord.save();
    res.status(201).json(savedRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateAqiRecord = async (req, res) => {
  try {
    const updatedRecord = await AQI.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedRecord)
      return res.status(404).json({ message: "Record not found" });
    res.status(200).json(updatedRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteAqiRecord = async (req, res) => {
  try {
    const deletedRecord = await AQI.findByIdAndDelete(req.params.id);
    if (!deletedRecord)
      return res.status(404).json({ message: "Record not found" });
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
