// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Product belongs to Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
});

// Category has many Product models
Category.hasMany(Product, {
  foreignKey: "category_id",
});

// Product belongs to many Tag models and vice versa
Product.belongsToMany(Tag, { through: ProductTag, foreignKey: "product_id" });
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: "tag_id" });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
