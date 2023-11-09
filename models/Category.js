// Destructure the Model class and DataTypes object from the sequelize package
const { Model, DataTypes } = require("sequelize");

// Import the sequelize instance from the connection.js file
const sequelize = require("../config/connection.js");

// Extend the Model class to create our own Category model
class Category extends Model {}

// Initialize the model's data and configuration by calling the init method
Category.init(
  {
    // Define the model schema with fields and data types
    id: {
      type: DataTypes.INTEGER, // Specifies that the id is an integer
      allowNull: false, // This field cannot be null
      primaryKey: true, // This field is the primary key
      autoIncrement: true, // Auto-increment the id for each new entry
    },

    category_name: {
      type: DataTypes.STRING, // Specifies that the category_name is a string
      allowNull: false, // This field cannot be null
    },
  },

  {
    // Additional model configuration
    sequelize, // Pass the connection instance
    timestamps: false, // Do not automatically add timestamp fields
    freezeTableName: true, // Prevent sequelize from renaming the table
    underscored: true, // Use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    modelName: "category", // Use a custom model name instead of the default
  }
);

// Export the Category model for use in other parts of the application
module.exports = Category;
