// Import the Tag model from the models directory.
const { Tag } = require("../models");

// Create an array of tag objects, each with a tag_name property.
const tagData = [
  {
    tag_name: "rock music",
  },
  {
    tag_name: "pop music",
  },
  {
    tag_name: "blue",
  },
  {
    tag_name: "red",
  },
  {
    tag_name: "green",
  },
  {
    tag_name: "white",
  },
  {
    tag_name: "gold",
  },
  {
    tag_name: "pop culture",
  },
];

// A function that seeds the database with the tag data using bulkCreate for efficiency.
const seedTags = () => Tag.bulkCreate(tagData);

// Export the seedTags function for use in the seeding process.
module.exports = seedTags;
