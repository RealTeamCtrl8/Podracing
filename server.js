require('dotenv').config();
const http = require('http');
const app = require('./lib/app');
const server = http.createServer(app);
const connect = require('./lib/connect');
const raceScheduler = require('./lib/scripts/race-scheduler');

// I combined these, see seed-data.js
const { seedData } = require('./lib/scripts/seed-data');

connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/starwars');

const port = process.env.PORT || 3000;

// If the intent is to wait until seed data is created before starting server, you need to handle async:
seedData().then(() => {
    server.listen(port, () => {
        console.log('server is running', server.address().port);//eslint-disable-line
    });
    raceScheduler();
});
