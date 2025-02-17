const multer = require("multer");
const path = require("path");

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory to store images
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname); // Create a unique filename
    cb(null, uniqueName);
  },
});

// Initialize multer upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Allowed file types
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error("Error: Only JPEG, JPG, and PNG images are allowed!"));
    }
  },
});

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Handle multer specific errors
    return res.status(400).json({
      status: "Error",
      message: `Multer Error: ${err.message}`,
    });
  } else if (err) {
    // Handle other errors like file type validation
    return res.status(400).json({
      status: "Error",
      message: err.message,
    });
  }
  next();
};

module.exports = { upload, handleMulterError };
