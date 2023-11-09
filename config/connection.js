// Load environment variables from .env file
require("dotenv").config();

// Import Sequelize constructor from the sequelize library
const Sequelize = require("sequelize");

// Create a Sequelize instance; use JAWSDB_URL for the database URL if it's provided (e.g., when deployed to Heroku),
// otherwise use the local database credentials provided in the .env file
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL) // Use JAWSDB_URL if available
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: "localhost", // Database host, which is localhost for a local database
        dialect: "mysql", // The database dialect to use. In this case, we're using MySQL
        dialectOptions: {
          decimalNumbers: true, // Ensure that decimal columns are parsed as such in JavaScript and not as strings
        },
      }
    );

// Export the sequelize instance for use in other parts of the application
module.exports = sequelize;
