// Import the necessary features from the sequelize package
const { Model, DataTypes } = require("sequelize");

// Import the established sequelize connection from the connection.js file
const sequelize = require("../config/connection.js");

// Extend the Sequelize Model class to create a new Tag model
class Tag extends Model {}

// Initialize the Tag model with its schema definition
Tag.init(
  {
    // define the columns in the table
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
    },
  },
  {
    // Model configuration
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "tag",
  }
);

// Export the Tag model for use in other parts of the application
module.exports = Tag;
