const { assert } = require('chai');
const request = require('./request');
const db = require('./db');

describe('Characters test', () => {
    beforeEach(()=> db.drop());

    it.only('should retrieve all vehicles from api', () => {
        return request.get('/api/characters?page=1')
            .then( ({body}) => {
                console.log(body);
                assert.ok(body[0].name);
            });
    });

});