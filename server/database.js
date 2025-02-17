const mongoose = require("mongoose");
require("dotenv").config()
const DB_URL = process.env.DB_URL
const PORT = process.env.PORT

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log(`Database connected on port ${PORT}`);
  })
  .catch((error) => {
    console.log("Database error",error);
  });
