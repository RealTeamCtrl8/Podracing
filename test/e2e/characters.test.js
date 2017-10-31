const { assert } = require('chai');
const request = require('./request');
const db = require('./db');

describe('Characters test', () => {
    beforeEach(()=> db.drop());

    it('should retrieve all vehicles from api', () => {
        return request.get('/api/characters?page=1')
            .then( ({body}) => {
                assert.ok(body[0].name);
            });
    });

});