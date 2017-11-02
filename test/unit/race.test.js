const {assert} = require('chai');
const Race = require('../../lib/models/race');



describe('Race model', () => {

    it('should validate a good model', () => {
        const race = new Race({
            planet: '59ef87b38e62d836e1c0ee48',
            user: '59ef87b38e62d836e1c0ee41',
            endTime: new Date,
            active: true
        });
        const validate = race.validateSync();
        assert.equal(validate, undefined);
    });

    it('Checks required fields', () => {
        const badRace = new Race({}); 
        const { errors } = badRace.validateSync();
        assert.equal(errors.planet.kind,'required');
        assert.equal(errors.active.kind,'required');
    });
});