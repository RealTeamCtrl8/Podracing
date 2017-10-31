const { assert } = require('chai');
const request = require('./request');
const db = require('./db');

describe('Characters test', () => {
    beforeEach(()=> db.drop());

    it.only('should retrieve all characters from api', () => {
        return request
            .get('/api/characters/')
            .then( ({body}) => {
                assert.ok(body);
            });
    });
});