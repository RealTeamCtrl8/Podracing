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
                    endTime: new Date,
                    active: true
                };
                hothRace2 = {
                    planet: planet._id,
                    endTime: new Date,
                    active: true
                };
            });
    });    

    it('Posts a race to the api', () => {
        return request.post('/api/races')
            .send({
                planet: planet._id,
                endTime: new Date,
                active: true
            })
            .then(res => {
                const race = res.body;
                assert.ok(race._id);
                assert.equal(race.planet, hothRace.planet);
            });
    });

    it('should retrieve all Races from api', () => {
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

    it('gets a race by id', () => {
        let race = null;
        return request.post('/api/races')
            .send(hothRace)
            .then(res => {
                race = res.body;
                return request.get(`/api/races/${race._id}`);
            })
            .then(res => {
                assert.equal(res.body._id, race._id);
            });
    });

    it('Get by id returns a 404 for bad id', () => {
        return request.get('/api/races/59dfeaeb083bf9badcc97ce8')
            .then(
                () => { throw new Error('Incorrect id');},
                err => {
                    assert.equal(err.status, 404);
                });
    });
});