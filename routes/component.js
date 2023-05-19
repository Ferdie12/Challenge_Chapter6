const express = require("express");
const components = require("../controllers/component.js")

const router = express.Router();

router.get('/components', components.getAll);
router.get('/components/:id_component', components.getById);
router.post('/components', components.create);
router.put('/components/:id_component', components.update);
router.delete('/components/:id_component', components.destroy);

module.exports = router;