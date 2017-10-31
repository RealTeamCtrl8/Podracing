const {assert} = require('chai');
const Character = require('../../lib/models/character');

describe.only('Character Model', () => {
    const character = new Character ({
        name: 'Hans Solo'
    });
    it('should validate the character model', () => {
        assert.equal(character.validateSync(), undefined);
    });
    it('checks required fields', () => {
        const badCharacter = new Character ({});
        const {errors} = badCharacter.validateSync();
        assert.equal(errors.name.kind, 'required');
    });
});