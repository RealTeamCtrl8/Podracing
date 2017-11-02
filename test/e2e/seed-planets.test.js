const { assert } = require('chai');
const seedPlanets = require('../../lib/scripts/seed-planets');
const db = require('./db');
const Planet = require('../../lib/models/planet');

describe.only('Seed Planets test', () => {

    before(() => {
        db.drop();
    });

    let planetCount = 0;

    it('should seed planets', function() {
        this.timeout(15000);
        return seedPlanets()
            .then(() => {
                return Planet.find().count();
            })
            .then(count => {
                planetCount = count;
                assert.isOk(count > 0);
            });
    });

    it('should not seed planets if already exist', function () {
        this.timeout(15000);
        return seedPlanets()
            .then(() => {
                return Planet.find().count();
            })
            .then(count => {
                assert.equal(count, planetCount);
            });
    });
});