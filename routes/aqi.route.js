// routes/AqiRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllAqiRecords,
  getAqiRecordById,
  createAqiRecord,
  updateAqiRecord,
  deleteAqiRecord,
} = require("../controllers/aqi.controller");

// GET all AQI records
router.get("/", getAllAqiRecords);

// GET a single AQI record by ID
router.get("/:id", getAqiRecordById);

// POST a new AQI record
router.post("/", createAqiRecord);

// PUT (update) an AQI record by ID
router.put("/:id", updateAqiRecord);

// DELETE an AQI record by ID
router.delete("/:id", deleteAqiRecord);

module.exports = router;
