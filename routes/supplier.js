const express = require("express");
const suppliers = require("../controllers/supplier.js")

const router = express.Router();

router.get('/suppliers', suppliers.getAll);
router.get('/suppliers/:id_supplier', suppliers.getById);
router.post('/suppliers', suppliers.create);
router.put('/suppliers/:id_supplier', suppliers.update);
router.delete('/suppliers/:id_supplier', suppliers.destroy);

module.exports = router;