const {assert} = require('chai');
const Race = require('../../lib/models/race');
const Planet = require('../../lib/models/planet');


describe('Race model', () => {
    const race = new Race({
        planet: {
            type: Schema.Types.ObjectId,
            ref: 'Planet',
            required: true
        },
        raceLog: [{
            planet: String,
            race: String,
            winner: String
        }],
        logger: [],
        bankRoll:


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