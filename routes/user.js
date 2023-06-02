const express = require("express");
const user = require("../controllers/user.js");
const middleware = require("../utils/auth.js");
const multer = require('multer')();

const router = express.Router();

router.get('/activation', user.activation);
router.post('/auth/register', user.register);
router.get('/auth/login/google', user.google_login);
router.post('/auth/login', user.login);
router.put('/avatar', middleware.auth, multer.single("media"), user.update);

module.exports = router;