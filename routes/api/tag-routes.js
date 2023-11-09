// Importing Express router and models from the database
const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// Route to get all tags and their associated products
router.get("/", async (req, res) => {
  try {
    // Fetching all tags including their related Product data
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get a single tag by its ID, including associated products
router.get("/:id", async (req, res) => {
  try {
    // Fetching one tag by its ID
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to create a new tag
router.post("/", async (req, res) => {
  try {
    // Creating a new tag with the data from the request body
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to update a tag's data by its ID
router.put("/:id", async (req, res) => {
  try {
    // Updating a tag's data based on the request body and where the ID matches
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (tagData == 0) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }

    res.status(200).json({ message: "Tag updated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete a tag by its ID
router.delete("/:id", async (req, res) => {
  try {
    // Deleting a tag where the ID matches
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }

    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Exporting the router to be mounted by the main application
module.exports = router;
