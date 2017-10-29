const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const morgan = require('morgan');
app.use(morgan('dev'));

const errorHandler = require('./utils/error-handler');
app.use(errorHandler());


module.exports = app;