const { assert } = require('chai');
const request = require('./request');
const db = require('./db');

describe('Races test', () => {
    beforeEach(() => db.drop());

    const hothCircuit = {
        
    };

    it.only('Posts a race to the api', () => {

    });

    it.skip('should retrieve all Races from api', () => {
        return request.get('/api/races')
        //todo: rewrite differently
            .then(({ body }) => {
                assert.ok(body[0].name);
            });
    });

    it.skip('Checks the raceDetails function', () => {


    });


});

return {
    planetArray: this.planet,//todo get 1 random planet from the array
    distance: distance,
    prize: prize
};