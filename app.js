require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Sentry = require('@sentry/node');
const morgan = require('morgan');
const ui = require("swagger-ui-express");
const yaml = require("yaml");
const fs = require("fs");
const router = require('./routes');

const file = fs.readFileSync('./api.yaml', 'utf-8');
const fileku = yaml.parse(file);

const app = express();

const {DSN, ENVIRONMENT} = process.env ;

Sentry.init({
    environment: ENVIRONMENT,
    dsn: DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app }),
      ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
    ],
    tracesSampleRate: 1.0,
  });

app.use('/api-docs', ui.serve, ui.setup(fileku));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(router);

app.use((req,res,next) => {
    try {
        return res.status(404).json({
            message: "salah link cuy!"
        })
    } catch (err) {
        next(err)
    }
})

app.use(Sentry.Handlers.errorHandler());

app.use((err,req,res,next) => {
    return res.status(500).json({
        message: err.message
    })
})


module.exports = app;
