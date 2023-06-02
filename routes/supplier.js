const express = require("express");
const suppliers = require("../controllers/supplier.js");
const middleware = require("../utils/auth.js");

const router = express.Router();

router.get('/suppliers',middleware.auth, suppliers.getAll);
router.get('/suppliers/:id_supplier', middleware.auth, suppliers.getById);
router.post('/suppliers', middleware.auth, middleware.adminOnly, suppliers.create);
router.put('/suppliers/:id_supplier', middleware.auth, middleware.adminOnly, suppliers.update);
router.delete('/suppliers/:id_supplier', middleware.auth, middleware.adminOnly, suppliers.destroy);

module.exports = router;