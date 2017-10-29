const http = require('http');
const app = require('./lib/app');
const server = http.createServer(app);

const bodyParser = require('body-parser');


const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log('server is running', server.address());
});