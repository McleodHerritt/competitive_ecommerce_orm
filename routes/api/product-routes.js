// Import the Express router and the required models from the database
const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// Retrieving all products
router.get("/", async (req, res) => {
  try {
    // Fetch all products from the database, including their categories and tags
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    // Send the fetched data back to the client with a 200 OK status
    res.status(200).json(productData);
  } catch (err) {
    // If an error occurs, respond with a 500 Internal Server Error status
    res.status(500).json(err);
  }
});

// Retrieving a single product by its ID
router.get("/:id", async (req, res) => {
  try {
    // Fetch a single product based on its primary key (ID), including its categories and tags
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });

    // If the product is not found, send a 404 Not Found status with a message
    if (!productData) {
      res.status(404).json({ message: "No product found with that id!" });
      return;
    }

    // Send the fetched product data back to the client with a 200 OK status
    res.status(200).json(productData);
  } catch (err) {
    // If an error occurs, respond with a 500 Internal Server Error status
    res.status(500).json(err);
  }
});

// create new product
router.post("/", async (req, res) => {
  try {
    // Create a new product using the data from the request body
    const productData = await Product.create(req.body);
    // If there are tags associated with the product, create ProductTag relationships
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: productData.id,
          tag_id,
        };
      });
      // Bulk create the ProductTag relationships in the database
      await ProductTag.bulkCreate(productTagIdArr);
    }
    // Respond with the new product data and a 200 OK status
    res.status(200).json(productData);
  } catch (err) {
    // If an error occurs, log it to the console and respond with a 400 Bad Request status
    console.log(err);
    res.status(400).json(err);
  }
});

router.post(
  "/",
  (req, res) => {
    Product.create(req.body)
      .then((product) => {
        // if there's product tags, we need to create pairings to bulk create in the ProductTag model
        if (req.body.tagIds.length) {
          const productTagIdArr = req.body.tagIds.map((tag_id) => {
            return {
              product_id: product.id,
              tag_id,
            };
          });
          return ProductTag.bulkCreate(productTagIdArr);
        }
        // if no product tags, just respond
        res.status(200).json(product);
      })
      .then((productTagIds) => res.status(200).json(productTagIds))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // update product
  router.put("/:id", (req, res) => {
    // update product data
    Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then((product) => {
        if (req.body.tagIds && req.body.tagIds.length) {
          ProductTag.findAll({
            where: { product_id: req.params.id },
          }).then((productTags) => {
            // create filtered list of new tag_ids
            const productTagIds = productTags.map(({ tag_id }) => tag_id);
            const newProductTags = req.body.tagIds
              .filter((tag_id) => !productTagIds.includes(tag_id))
              .map((tag_id) => {
                return {
                  product_id: req.params.id,
                  tag_id,
                };
              });

            // figure out which ones to remove
            const productTagsToRemove = productTags
              .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
              .map(({ id }) => id);
            // run both actions
            return Promise.all([
              ProductTag.destroy({ where: { id: productTagsToRemove } }),
              ProductTag.bulkCreate(newProductTags),
            ]);
          });
        }

        return res.json(product);
      })
      .catch((err) => {
        // console.log(err);
        res.status(400).json(err);
      });
  })
);

//delete one product by its id
router.delete("/:id", async (req, res) => {
  try {
    // Delete the product from the database where the ID matches
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    // If no product was found to delete, send a 404 Not Found status with a message
    if (!productData) {
      res.status(404).json({ message: "No Product found with this id!" });
      return;
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export the router for use in the main app
module.exports = router;
