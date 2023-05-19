const express = require('express');
const morgan = require('morgan');
const ui = require("swagger-ui-express");
const yaml = require("yaml");
const fs = require("fs");
const router = require('./routes');

const file = fs.readFileSync('./api.yaml', 'utf-8');
const fileku = yaml.parse(file);

const app = express();
const port = process.env.PORT || 5000;

app.use('/api-docs', ui.serve, ui.setup(fileku))
app.use(morgan('dev'));
app.use(express.json());
app.use(router);

app.use((req,res,next) => {
    try {
        return res.status(404).json({
            message: "salah link cuy"
        })
    } catch (err) {
        next(err)
    }
})

app.use((err,req,res,next) => {
    return res.status(500).json({
        message: err.message
    })
})

app.listen(port, () => {
    console.log('server is running');
})
