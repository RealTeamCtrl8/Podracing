const  {assert} = require('chai');
const request = require('./request');
const db = require('./db');
const planetSeed = require('../../lib/scripts/seed-planets');

describe('Planets test', () => {
    beforeEach(function () {
        db.drop();
        this.timeout(15000);
        return planetSeed();
    });

    it.only('should retrieve all planets from API', function() {
        this.timeout(15000);
        return request 
            .get('/api/planets/')
            .then(({body}) => {
                assert.equal(body.length, 61);
            });
    });
});