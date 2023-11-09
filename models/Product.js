// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");
const Tag = require("./Tag");
const Category = require("./Category");

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
      // references: {
      //   model: Product,
      //   key: "id",
      // },
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
      },
      // references: {
      //   model: Tag,
      //   key: "id",
      // },
    },

    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    // Define a 'category_id' attribute for the 'Product' model
    category_id: {
      type: DataTypes.INTEGER, // Set the data type to INTEGER
      references: {
        model: Category, // This sets up a foreign key that references the 'Category' model
        key: "id", // Specifies that the 'id' column in the 'Category' table is the key that 'category_id' references
      },
    },
  },
  {
    sequelize, // Pass the sequelize instance
    timestamps: false, // Indicates that Sequelize should not automatically manage createdAt and updatedAt timestamps for this model
    freezeTableName: true, // Instructs Sequelize not to change the table name to be plural
    underscored: true, // Tells Sequelize to use underscores instead of camelCasing for column names (e.g., 'created_at' instead of 'createdAt')
    modelName: "product", // Defines the name of the model
  }
);

module.exports = Product; // Export the Product model for use in other files
