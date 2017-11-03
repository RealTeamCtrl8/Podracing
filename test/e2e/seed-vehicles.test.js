const {assert} = require('chai');
const seedVehicles = require('../../lib/scripts/seed-vehicles');
const db = require('./db');
const Vehicle = require('../../lib/models/vehicle');

describe('Seed Vehicles test', () => {
    before(() => {
        db.drop();
    });

    let vehicleCount = 0;

    it('should see vehicles', function () {
        this.timeout(15000);
        return seedVehicles()
            .then(() => {
                return Vehicle.find().count();
            })
            .then(count => {
                vehicleCount = count;
                assert.isOk(count > 0);
            });
    });

    it('should not seed vehicles if already exist', function() {
        this.timeout(15000);
        return seedVehicles()
            .then(() => {
                return Vehicle.find().count();
            })
            .then(count => {
                assert.equal(count, vehicleCount);
            });
    });
});