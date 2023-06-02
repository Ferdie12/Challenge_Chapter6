const express = require("express");
const components = require("../controllers/component.js");
const middleware = require("../utils/auth.js");

const router = express.Router();

router.get('/components', middleware.auth, components.getAll);
router.get('/components/:id_component', middleware.auth, components.getById);
router.post('/components', middleware.auth, middleware.adminOnly, components.create);
router.put('/components/:id_component', middleware.auth, middleware.adminOnly, components.update);
router.delete('/components/:id_component', middleware.auth, middleware.adminOnly, components.destroy);

module.exports = router;