// Import the Express router
const router = require("express").Router();
// Import the API routes module
const apiRoutes = require("./api");

// Add '/api' prefix to all of the API routes imported from apiRoutes
router.use("/api", apiRoutes);

// A catch-all route that catches any requests that don't match any routes defined above
router.use((req, res) => {
  // Send an HTML response indicating the route is not recognized
  res.send("<h1>Wrong Route!</h1>");
});

// Export the router for use in the main server file
module.exports = router;
