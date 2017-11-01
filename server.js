require('dotenv').config();
const http = require('http');
const app = require('./lib/app');
const server = http.createServer(app);
const connect = require('./lib/connect');

connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/starwars');

// const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log('server is running', server.address().port);//eslint-disable-line
});

function checkPlaceholder(){
    //check races in db collection for endTime < current date
    console.log('checking for completed races');
}

function schedulePlaceholder(){
    //populate race db with new race instances
    console.log('adding new races');
}

setInterval(checkPlaceholder, 1000);
setInterval(schedulePlaceholder, 5000);