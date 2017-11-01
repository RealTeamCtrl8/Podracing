const { assert } = require('chai');
const request = require('./request');
const db = require('./db');

describe('Races test', () => {
    beforeEach(() => db.drop());

    let planet = {
        name: 'hoth',
    };
    let hothRace = null;
    
    beforeEach(() => {
        return request.post('/api/planets')
            .send(planet)
            .then(res => {
                planet = res.body;
                hothRace = {
                    planet: planet._id,
                    endTime: new Date
                };
            });
    });
    
    

    it.only('Posts a race to the api', () => {
        return request.post('/api/races')
            .send({
                planet: planet._id,
                endTime: new Date
            })
            .then(res => {
                const race = res.body;
                assert.ok(race._id);
                assert.equal(race.planet, hothRace.planet);
            });
    });

    it.skip('should retrieve all Races from api', () => {
        return request.get('/api/races')
        //todo: rewrite differently
            .then(({ body }) => {
                assert.ok(body[0].name);
            });
    });

    it.skip('Checks the raceScheduler function', () => {
        //todo: write raceScheduler

    });


});
