const express = require("express");
const ProductController = require("../controllers/product");
const router = express.Router();

router.get("/product", ProductController.getAllProduct);
router.get("/product/:id", ProductController.getProductById);
router.post("/product", ProductController.createProduct);
router.put("/product/:id", ProductController.updateProduct);
router.delete("/product/:id", ProductController.deleteProduct);

module.exports = router;
