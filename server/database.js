const mongoose = require("mongoose");

const DB_URL =
  "mongodb+srv://samyak786jain:rcALdz2hda8fL0OH@database-server.kykq2ld.mongodb.net/user-management";

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Database error",error);
  });
