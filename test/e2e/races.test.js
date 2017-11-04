const { assert } = require('chai');
const request = require('./request');
const db = require('./db');
const seedPlanets = require('../../lib/scripts/seed-planets');
const Planet = require('../../lib/models/planet');

describe('Races test', () => {
    beforeEach(() => db.drop());

    let newUser = null;
    let userToken = null;
    let planet = null;
    let hothRace = null;

    beforeEach(() => {
        newUser = {
            name: 'xXcYbEr_GoKu_666Xx',
            email: '10_yr_old_hacker@gmail.com',
            password: '123hello'
        };

        return request
            .post('/api/users/signup')
            .send(newUser)
            .then(({ body }) => {
                userToken = body.token;
            })
            .then( () =>{
                return seedPlanets();
            })
            .then( () =>{
                return Planet.findOne();
            })
            .then( found =>{
                planet = found;
                hothRace = {
                    planet: planet._id,
                    endTime: Date.parse(new Date)+1000,
                    active: true,
                    prize: 1234
                };
            });
    });

    it('posts a race to the api', () => {
        return request.post('/api/races')
            .set('Authorization', userToken)
            .send({
                planet: planet._id,
                endTime: Date.parse(new Date),
                active: true,
                prize: 1234
            })
            .then(res => {
                const race = res.body;
                assert.ok(race._id);
                assert.equal(race.planet, hothRace.planet);
            });
    });

    it('returns a 404 for bad id', () => {
        return request.get('/api/races/59dfeaeb083bf9badcc97ce8')
            .then(
                () => { throw new Error('Incorrect id');},
                err => {
                    assert.equal(err.status, 404);
                });
    });
});