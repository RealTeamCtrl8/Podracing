const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const morgan = require('morgan');
app.use(morgan('dev'));

const publicDir = './public';
app.use(express.static(publicDir));

const users = require('./routes/users');
app.use('/api/users', users);

const characters = require('./routes/characters');
app.use('/api/characters', characters);

const vehicles = require('./routes/vehicles');
app.use('/api/vehicles', vehicles);

const planets = require('./routes/planets');
app.use('/api/planets', planets);

const errorHandler = require('./utils/error-handler');
app.use(errorHandler());

module.exports = app;