const newman = require("newman"); // Newman ko require kar rahe hain

newman.run(
  {
    collection: require('../../../../../user-management.postman_collection.json'), // Postman collection ka path
    environment: require("./path/to/your-environment.json"), // Environment ka path (optional)
    reporters: "cli", // CLI reporter use kar rahe hain
  },
  function (err) {
    if (err) {
      throw err;
    }
    console.log("Collection run completed!");
  }
);
