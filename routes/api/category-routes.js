// Import the Express router and the Category and Product models
const router = require("express").Router();
const { Category, Product } = require("../../models");

// Import the Express router and the Category and Product models
router.get("/", async (req, res) => {
  try {
    // Retrieve all categories and include associated products
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    // Respond with the retrieved data and a 200 OK status
    res.status(200).json(categoryData);
  } catch (err) {
    // Handle errors with a 500 Internal Server Error status
    res.status(500).json(err);
  }
});

// GET request to /api/categories/:id to retrieve a single category by its id
router.get("/:id", async (req, res) => {
  try {
    // Retrieve one category by its primary key (id) with associated products
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    // If the category isn't found, respond with a 404 Not Found status
    if (!categoryData) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }
    // Respond with the retrieved data and a 200 OK status
    res.status(200).json(categoryData);
  } catch (err) {
    // Handle errors with a 500 Internal Server Error status
    res.status(500).json(err);
  }
});

// POST request to /api/categories to create a new category
router.post("/", async (req, res) => {
  try {
    // Create a new category with the request body data
    const categoryData = await Category.create(req.body);
    // Respond with the newly created category and a 200 OK status
    res.status(200).json(categoryData);
  } catch (err) {
    // Handle errors with a 400 Bad Request status
    res.status(400).json(err);
  }
});

// PUT request to /api/categories/:id to update a category by its id
router.put("/:id", async (req, res) => {
  try {
    // Update a category's data where the id matches the request parameter
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // If no category was updated, respond with a 404 Not Found status
    if (!categoryData[0]) {
      res
        .status(404)
        .json({ message: "No category found with this id to update!" });
      return;
    }
    // Respond with a success message and a 200 OK status
    res.status(200).json({ message: "Category updated successfully" });
  } catch (err) {
    // Handle errors with a 500 Internal Server Error status
    res.status(500).json(err);
  }
});

// DELETE request to /api/categories/:id to delete a category by its id
router.delete("/:id", async (req, res) => {
  try {
    // Delete the category where the ID matches the ID in the URL parameters
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    // If no category is found, return a 404 Not Found status with a message
    if (!categoryData) {
      res
        .status(404)
        .json({ message: "No category found with this id to delete!" });
      return;
    }
    // Send a success message back to the client with a 200 OK status
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    // If an error occurs, send a 500 Internal Server Error status
    res.status(500).json(err);
  }
});

// Export the router to be used by the main app
module.exports = router;
