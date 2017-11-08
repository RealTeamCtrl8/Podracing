const { assert } = require('chai');
const seed = require('../../lib/scripts/seed-data');
const db = require('./db');
const Character = require('../../lib/models/character');
const Planet = require('../../lib/models/planet');
const Vehicle = require('../../lib/models/vehicle');

describe('Seed Data', () => {
    before(()=> {
        db.drop();
    });

    testSeedData(Character, seed.characters);
    testSeedData(Planet, seed.planets);
    testSeedData(Vehicle, seed.vehicles);

    function testSeedData(Model, seedFn) {
        describe(Model.modelName, () => {
    
            let seedCount = 0;
    
            it('should seed data', function() {
                this.timeout(15000);
                return seedFn()
                    .then(() => {
                        return Model.find().count();
                    })
                    .then(count => {
                        seedCount = count;
                        assert.isOk(count > 0);
                    });
            });
    
            it('should not seed data if already exist', function() {
                return seedFn()
                    .then(() => {
                        return Model.find().count();
                    })
                    .then(count => {
                        assert.equal(count, seedCount);
                    });
            });
        });

    }

});