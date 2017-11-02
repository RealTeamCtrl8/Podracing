const { assert } = require('chai');
const db = require('./db');
const request = require('./request');
// const schedule = require('../../lib/timers/create-race');
const Race = require('../../lib/models/race');

describe.only('Create race test', () => {

    beforeEach(() => {
        db.drop();
    });

    const testRace = new Race({
        planet: Alderaan,
        users: '59ef87b38e62d836e1c0ee41',
        endTime: new Date(11 - 2 - 2017),
        active: true,
        prize: 100,
        winner: null
    });

    it('should create races', () => {
        return request.post('/api/races')
            .send(schedule(testRace))
            .then(res => {
                const race = res.body;
                assert.ok(race._id);
                assert.equal(race.users, testRace.users);
            });

    });
});