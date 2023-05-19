const express = require("express");
const products = require("../controllers/product.js")

const router = express.Router();

router.get('/products', products.getAll);
router.get('/products/:id_product', products.getById);
router.post('/products', products.create);
router.put('/products/:id_product', products.update);
router.delete('/products/:id_product', products.destroy);

module.exports = router;