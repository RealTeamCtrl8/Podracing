const {assert} = require('chai');
const Planet = require('../../lib/models/planet');

describe('Planet model', () => {
    const planet = new Planet({name: 'tawser'});

    it('should validate model', () => {
        const validate = planet.validateSync();
        assert.equal(validate, undefined);
    });
});