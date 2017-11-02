const { assert } = require('chai');
const seedCharacters = require('../../lib/scripts/seed-characters');
const db = require('./db');
const Character = require('../../lib/models/character');

describe('Seed Characters test', () => {

    before(()=> {
        db.drop();
    });

    let characterCount = 0;

    it('should seed characters', function() {
        this.timeout(15000);
        return seedCharacters()
            .then(() => {
                return Character.find().count();
            })
            .then(count => {
                characterCount = count;
                assert.isOk(count > 0);
            });
    });

    it('should not seed characters if already exist', function() {
        this.timeout(15000);
        return seedCharacters()
            .then(() => {
                return Character.find().count();
            })
            .then(count => {
                assert.equal(count, characterCount);
            });
    });
});
