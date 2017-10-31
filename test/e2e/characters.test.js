const { assert } = require('chai');
const request = require('./request');
const db = require('./db');

describe('Characters test', () => {
    beforeEach(()=> db.drop());

    it('should retrieve all vehicles from api', () => {
        return request.get('/')
            .then( got => {
                assert.ok(got);
            });
    });
});