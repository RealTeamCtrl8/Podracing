const {assert} = require('chai');
const Planet = require('../../lib/models/planet');

describe.skip('Planet model', () => {
    const planet = new Planet({name: 'tawser'});

    it('should validate model', () => {
        const validate = planet.validateSync();
        assert.equal(validate, undefined);
    });

    it('should reject a bad planet name', () => {
        const badPlanet = new Planet({}); 
        const {errors} = badPlanet.validateSync();
        assert.equal(errors.name.kind,'required');
    });
});