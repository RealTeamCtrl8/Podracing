const { assert } = require('chai');
const request = require('./request');
const db = require('./db');

describe('Races test', () => {
    beforeEach(() => db.drop());
    let race = null;
    let planet = null;


    const hoth = {
        planet: 'hoth'
    };

    beforeEach(() =>{
        return request.post('/api/starwars')
            .send(hoth)
            .then(res => planet = res.body);
    });

    beforeEach(() => {
        race = {
            planet: planet._id,
            endTime: new Date
        };
        return request.post('/api/starwars')
            .send(race)
            .then(res => race = res.body);
    });


    it.only('Posts a race to the api', () => {
        return request.post('/api/starwars')
            .send(race)
            .then(res => {

            })
    });

    it.skip('should retrieve all Races from api', () => {
        return request.get('/api/starwars')
        //todo: rewrite differently
            .then(({ body }) => {
                assert.ok(body[0].name);
            });
    });

    it.skip('Checks the raceScheduler function', () => {
        //todo: write raceScheduler

    });


});

// return {
//     planetArray: this.planet,//todo get 1 random planet from the array
//     distance: distance,
//     prize: prize
// };