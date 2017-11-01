const { assert } = require('chai');
const request = require('./request');
const db = require('./db');

describe('Races test', () => {
    beforeEach(() => db.drop());

    let planet = {
        name: 'hoth',
    };
    let hothRace = null;
    let hothRace2 = null;

    beforeEach(() => {
        return request.post('/api/planets')
            .send(planet)
            .then(res => {
                planet = res.body;
                hothRace = {
                    planet: planet._id,
                    endTime: new Date
                };
                hothRace2 = {
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

    it.only('should retrieve all Races from api', () => {
        const saves = [hothRace, hothRace2].map(race => {
            return request.post('/api/races')
                .send(race)
                .then(res => res.body);
        });
        let saved = null;
        let savedRaces = null;
        return Promise.all(saves)
            .then(_saved => {
                saved = _saved;
                savedRaces = saved.map( save => {
                    return{
                        planet: save.planet,
                        endTime: save.endTime
                    };
                });
                return request.get('/api/races');
            })
            .then(res =>{
                assert.equal(res.body.endTime, savedRaces.endTime);
                assert.equal(res.body.planet, savedRaces.planet);
            });
    });

    it.only('gets a race by id', () => {
        let savedRace = null
        return request.post('/api/races')
            .send(hothRace)
            .then(res => {
                savedRace = res.body;
                
                
                return request.get(`/api/races/${race._id}`)
                    .then(got =>{ 
                        console.log('========================', got.body);
                        assert.equal(got.body._id, planet._id);
                    });
            });
    });

    it.skip('Get by id returns a 404 for bad id', () => {

    });
});