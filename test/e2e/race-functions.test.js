const { assert } = require('chai');
const db = require('./db');
const seedPlanets = require('../../lib/scripts/seed-planets');
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

    //TODO: create reasonable test for finishRace()
    it.skip('should finish all completed races', () => {
        return createExpiredRace()
            .then( () => createExpiredRace())
            .then( () => createRace())
            .then( () => createRace())
            .then( () => createSingleUserRace())
            .then( () => finishRaces())
            //Why does this return a different array than what is in database?
            .then( () => Race.find())
            .then( got => {
                console.log('==================', got);
                // assert.equal(got.body[0].active, false);
                assert.equal(got.length, 2);
            });
    });


});