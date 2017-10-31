const http = require('http');
const app = require('./lib/app');
const server = http.createServer(app);
const connect = require('./lib/connect');

connect(process.env.MONGODB_URI || 'mongodb://localhost:27017:starwars');

// const bodyParser = require('body-parser');


const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log('server is running', server.address().port);
});