const express = require("express");
const routerComponent = require('./component');
const routerProduct = require('./product');
const routerSupplier = require('./supplier');

const router = express.Router();

router.use(routerComponent);
router.use(routerProduct);
router.use(routerSupplier);

router.get('/', (req,res) => {
    res.status(200).json({
        message: "welcome to Challenge ferdie in production"
    })
})

router.get('/error', (req,res) => {
    res.status(200).json({
        status: false,
        message: "percobaan debugging in production",
        data : data
    })
})

module.exports = router;