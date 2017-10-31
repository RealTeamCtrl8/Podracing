const {assert} = require('chai');
const Race = require('../../lib/models/race');


describe('Race model', () => {
    const race = new Race({
        planet: 'Aleran',
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        endTime: Number


    });

    it.only('should validate a good model', () => {
        const validate = race.validateSync();
        assert.equal(validate, undefined);
    });

    it.skip('', () => {
        const badRace = new Race({}); 
        const { errors } = badRace.validateSync();
        assert.equal(errors.race.kind,'required');
    });
});