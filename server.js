const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();

require("dotenv").config();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// mongodb atlas connect
const uri = process.env.MONGODB_CLUSTER_URI;
mongoose.connect(uri, { dbName: "airsense" });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Cloud connection established successfully");
});

const aqiRoutes = require("./routes/aqi.route");
app.use("/api/v1/aqi", aqiRoutes);

const port = process.env.PORT;
const ip = process.env.IP;

app.listen(port, ip, () => {
  console.log(`Server is running at ${ip}:${port}`);
});
