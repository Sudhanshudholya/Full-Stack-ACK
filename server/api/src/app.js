const express = require("express");
require("dotenv").config()

const bodyParser = require("body-parser");
const App = express();
const cors = require("cors");
require("./database");
const corsOptions = {
  origin: process.env.CLIENT_BASE_URL, // Your frontend URL
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], // Allowed methods
  credentials: true,
};
App.use(cors());
App.use(bodyParser.json());
const router = require("./api/routes");
App.use("/uploads", express.static("uploads"));

App.use("/", router);

module.exports = App;
