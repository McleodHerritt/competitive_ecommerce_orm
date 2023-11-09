// Import the express module to create the server
const express = require("express");

// Import the routes from the 'routes' directory
const routes = require("./routes");

// Import the sequelize connection that you've configured in 'config/connection'
const sequelize = require("./config/connection");

// Initialize the express application
const app = express();

// Set the port for the server to run on, either from an environment variable or default to 3001
const PORT = process.env.PORT || 3001;

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Middleware to parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Use the imported routes as middleware, delegating route handling to them
app.use(routes);

// Sync sequelize models to the database. 'force: false' means the database tables will not be dropped and recreated if they already exist
sequelize.sync({ force: false }).then(() => {
  // Start the server and listen on the configured port
  // Once the server is running, log the listening port to the console
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
