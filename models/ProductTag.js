// Import Model class and DataTypes object from sequelize package
const { Model, DataTypes } = require("sequelize");

// Import the database connection instance
const sequelize = require("../config/connection");
// Import Product and Tag models to be used in foreign key references
const Product = require("./Product");
const Tag = require("./Tag");

// Define ProductTag class which extends Model, a class from Sequelize, to create a new model
class ProductTag extends Model {}

// Initialize the model and define its schema using the init method
ProductTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
    },

    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Tag,
        key: "id",
      },
    },
  },
  {
    // Model options
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag",
  }
);
// Export the ProductTag model for use in other parts of the application
module.exports = ProductTag;
