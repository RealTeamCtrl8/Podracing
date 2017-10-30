const {assert} = require('chai');
const Vehicle = require('../../lib/models/vehicle');

describe('Vehicle model', () => {
    const vehicle = new Vehicle({name: 'tawser', cost_in_credits: '100000000', max_atmosphering_speed: '123123'});

    it('should validate model', () => {
        const validate = vehicle.validateSync();
        assert.equal(validate, undefined);
    });

    it('should reject a bad vehicle name', () => {
        const badVehicle = new Vehicle({});
        const {errors} = badVehicle.validateSync();
        assert.equal(errors.name.kind,'required');
    });
});