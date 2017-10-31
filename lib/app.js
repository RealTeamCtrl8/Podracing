const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const morgan = require('morgan');
app.use(morgan('dev'));

const publicDir = './public';
app.use(express.static(publicDir));

const auth = require('./routes/auth');
app.use('/api/auth', auth);

const errorHandler = require('./utils/error-handler');
app.use(errorHandler());

module.exports = app;