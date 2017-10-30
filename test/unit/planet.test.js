const {assert} = require('chai');
const Planet = require('../../lib/models/planet');

describe('Planet model', () => {
    const planet = new Planet({name: 'tawser'});

    it('should validate model', () => {
        const validate = planet.validateSync();
        assert.equal(validate, undefined);
    });

    it.only('should reject a bad planet name', () => {
        const badPlanet = new Planet({
            planets: [{
            }]}); 
        const {errors} = badPlanet.validateSync();
        console.log('==============', errors);
        assert.equal(errors['planets.0.name'].kind,'required');
    });
});