const { assert } = require('chai');
const request = require('./request');
const db = require('./db');

describe('Races test', () => {
    beforeEach(() => db.drop());
    let hothRace = null;
    let planet = null;


    
    const hoth = {
        planet: 'hoth'
    };

    beforeEach(() =>{
        return request.post('/api/planets')
            .send(hoth)
            .then(res => planet = res.body);
    });

    beforeEach(() => {
        hothRace = {
            planet: planet._id,
            endTime: new Date
        };
        return request.post('/api/races')
            .send(hothRace)
            .then(res => hothRace = res.body);
    });


    it.only('Posts a race to the api', () => {
        return request.post('/api/races')
            .send(hothRace)
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
