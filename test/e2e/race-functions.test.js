const { assert } = require('chai');
const db = require('./db');
const seed = require('../../lib/scripts/seed-data');
const request = require('./request');
const createRace = require('../../lib/scripts/create-race');
const finishRaces = require('../../lib/scripts/finish-races');
const Race = require('../../lib/models/race');
const createExpiredRace = require('./scripts/create-expired-race');
const createSingleUserRace = require('./scripts/create-single-user-race');

describe('Race Functions test', () => {
    
    beforeEach(() => {
        db.drop();
    });

    beforeEach( function () {
        this.timeout(10000);
        return seed.planets();
    });    

    it('should create a new race', () => {
        return createRace()
            .then(res => {
                assert.ok(res.id);
            });
    });

    it('should create three new races', () => {
        return createRace()
            .then( () => createRace())
            .then( () => createRace())
            .then( () => {
                return request.get('/api/races');
            })
            .then(got => {
                assert.equal(got.body.length, 3);
            });
    });

    it('should finish all completed races', () => {
    
        return Promise.all([
            createExpiredRace(),
            createExpiredRace(),
            createRace(),
            createRace(),
            createSingleUserRace()
        ])
            .then(() => finishRaces())
            .then(() => Race.find())
            .then(races => {
                assert.isArray(races);
                assert.isAtLeast(races.length, 2);
            });
    });
});