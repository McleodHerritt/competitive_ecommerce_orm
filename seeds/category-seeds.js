// Import the Category model from the models directory
const { Category } = require("../models");

// Define an array of data representing categories
// Each object in the array represents a category with a specific name
const categoryData = [
  {
    category_name: "Shirts",
  },
  {
    category_name: "Shorts",
  },
  {
    category_name: "Music",
  },
  {
    category_name: "Hats",
  },
  {
    category_name: "Shoes",
  },
];

// A function to seed these categories into the database using the bulkCreate method
// This function will be called from a seed script to populate the database with initial data
const seedCategories = () => Category.bulkCreate(categoryData);

// Export the function so it can be used by the seed script
module.exports = seedCategories;
