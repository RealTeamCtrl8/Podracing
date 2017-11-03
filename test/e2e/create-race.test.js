const { assert } = require('chai');
const db = require('./db');
const seedPlanets = require('../../lib/scripts/seed-planets');
const request = require('./request');
const createRace = require('../../lib/scripts/create-race');

describe('Create race test', () => {

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

    it.only('should create three new races', () => {
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
});