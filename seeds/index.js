// Importing the seed functions from other seed files
const seedCategories = require("./category-seeds");
const seedProducts = require("./product-seeds");
const seedTags = require("./tag-seeds");
const seedProductTags = require("./product-tag-seeds");

// Import the Sequelize connection instance
const sequelize = require("../config/connection");

// The main seeding function that orchestrates the seeding of the entire database
const seedAll = async () => {
  // Reset the database and sync the model definitions to the database tables, clearing existing data
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  // Seed the Categories table with data and log the completion
  await seedCategories();
  console.log("\n----- CATEGORIES SEEDED -----\n");

  // Seed the Products table with data and log the completion
  await seedProducts();
  console.log("\n----- PRODUCTS SEEDED -----\n");

  // Seed the Tags table with data and log the completion
  await seedTags();
  console.log("\n----- TAGS SEEDED -----\n");

  // Seed the ProductTags join table with data and log the completion
  await seedProductTags();
  console.log("\n----- PRODUCT TAGS SEEDED -----\n");

  // Exit the process with a success code (0) after seeding is complete
  process.exit(0);
};

// Execute the main seeding function
seedAll();
