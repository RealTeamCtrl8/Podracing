require('dotenv').config();
const http = require('http');
const app = require('./lib/app');
const server = http.createServer(app);
const connect = require('./lib/connect');

// const scheduler = require('./lib/scripts/scheduler');

const seedPlanets = require('./lib/scripts/seed-planets');
const seedVehicles = require('./lib/scripts/seed-vehicles');
const seedCharacters = require('./lib/scripts/seed-characters');

connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/starwars');

// const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

seedPlanets();
seedVehicles();
seedCharacters();

server.listen(port, () => {
    console.log('server is running', server.address().port);//eslint-disable-line
});


// scheduler();