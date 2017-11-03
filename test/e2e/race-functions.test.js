const { assert } = require('chai');
const db = require('./db');
const seedPlanets = require('../../lib/scripts/seed-planets');
const request = require('./request');
const createRace = require('../../lib/scripts/create-race');
const createExpiredRace = require('../../lib/scripts/create-expired-race');
const finishRaces = require('../../lib/scripts/finish-races');


describe('Race Functions test', () => {
    
    beforeEach(() => {
        db.drop();
    });

    beforeEach( function () {
        this.timeout(10000);
        return seedPlanets();
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
        return createExpiredRace()
            .then( () => createExpiredRace())
            .then( () => createRace())
            .then( () => createRace())
            .then( () => finishRaces())
            .then( () => request.get('/api/races/'))
            .then( got => {
                assert.equal(got.body[0].active, true);
                assert.equal(got.body.length, 2);
            });
    });


});