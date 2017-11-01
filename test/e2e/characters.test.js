const { assert } = require('chai');
const request = require('./request');
const db = require('./db');

describe('Characters test', () => {
    beforeEach(()=> db.drop());

    it('should retrieve all characters from api', function()  {
        this.timeout(15000);
        return request
            .get('/api/characters/')
            .then( ({body}) => {
                assert.isArray(body);
                assert.ok(body[1].name);
            });
    });
});