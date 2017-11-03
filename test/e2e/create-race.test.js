const { assert } = require('chai');
const db = require('./db');
const seedPlanets = require('../../lib/scripts/seed-planets');
const request = require('./request');
const createRace = require('../../lib/scripts/create-race');

describe('Create race test', () => {

    beforeEach(() => {
        db.drop();
    });

    let planet = {
        name: 'hoth',
    };

    beforeEach(() => {
        return request.post('/api/planets')
            .send(planet)
            .then(res => {
                planet = res.body;
                return seedPlanets();
            });
    });    


    it('should create  a new race', () => {
        let savedRace = null;
        return createRace()
            .then( (newRace) =>{
                savedRace = newRace;
            }) 
            .then( () =>{
                return request.post('/api/races')
                    .send(savedRace);
            })
            .then(res => {
                const race = res.body;
                assert.ok(race._id);
                assert.equal(race._id, savedRace.id);
            });

    });
});