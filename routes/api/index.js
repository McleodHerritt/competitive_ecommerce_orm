// Import the Express router module
const router = require("express").Router();

// Import route modules for categories, products, and tags
const categoryRoutes = require("./category-routes");
const productRoutes = require("./product-routes");
const tagRoutes = require("./tag-routes");

// Mount the category routes on the router, prefixing them with '/categories'
router.use("/categories", categoryRoutes);
// Mount the product routes on the router, prefixing them with '/products'
router.use("/products", productRoutes);
// Mount the tag routes on the router, prefixing them with '/tags'
router.use("/tags", tagRoutes);

// Export the configured router to be used in the main server setup
module.exports = router;
