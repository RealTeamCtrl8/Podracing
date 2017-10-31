const {assert} = require('chai');
const request = require('./request');
const db = require('./db');

describe('Vehicles test', () => {
    beforeEach(() => db.drop());

    it.only('should retrieve all vehicles from API', () => {
        return request
            .get('/api/vehicles/')
            .then(({body}) => {
                assert.ok(body);
            });
    });
});