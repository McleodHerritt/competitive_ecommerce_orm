// Import the model classes for each table in the database
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Set up a one-to-many relationship where a product belongs to a single category
Product.belongsTo(Category, {
  foreignKey: "category_id", // The 'category_id' column in the 'Product' table points to the 'Category' table
});

// Set up a one-to-many relationship where a category can have multiple products
Category.hasMany(Product, {
  foreignKey: "category_id", // The 'category_id' column in the 'Product' table is the foreign key
});

// Products and Tags have a many-to-many relationship via the ProductTag junction table
Product.belongsToMany(Tag, { through: ProductTag, foreignKey: "product_id" }); // The 'product_id' column in the 'ProductTag' table points to the 'Product' table

Tag.belongsToMany(Product, { through: ProductTag, foreignKey: "tag_id" }); // The 'tag_id' column in the 'ProductTag' table points to the 'Tag' table

// Export the models for use in other parts of the application
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
