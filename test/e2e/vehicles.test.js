const {assert} = require('chai');
const request = require('./request');
const db = require('./db');

describe('Vehicles test', () => {
    beforeEach(() => db.drop());

    it('should retrieve all vehicles from API', function() {
        this.timeout(15000);
        return request
            .get('/api/vehicles/')
            .then(({body}) => {
                assert.equal(body.length, 39);
            });
    });
});