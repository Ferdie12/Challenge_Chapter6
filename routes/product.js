const express = require("express");
const products = require("../controllers/product.js");
const middleware = require("../utils/auth.js");

const router = express.Router();

router.get('/products', middleware.auth, products.getAll);
router.get('/products/:id_product',middleware.auth, products.getById);
router.post('/products',middleware.auth, middleware.adminOnly, products.create);
router.put('/products/:id_product', middleware.auth, middleware.adminOnly, products.update);
router.delete('/products/:id_product', middleware.auth, middleware.adminOnly, products.destroy);

module.exports = router;