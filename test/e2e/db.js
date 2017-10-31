const connect = require('../../lib/connect');
const url = 'mongodb://localhost:27017/starwars-test';
const mongoose = require('mongoose');

before (() => connect(url));

after(() => mongoose.connection.close());

module.exports = {
    drop(){
        return mongoose.connection.dropDatabase();
    }
};