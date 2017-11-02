const { assert } = require('chai');
const db = require('./db');
const schedule = require('../../lib/timers/create-race');
const Race = require('../../lib/models/race');




describe('Create race test', () => {

    beforeEach(() => {
        db.drop();

        
    });

    //TODO: finish test once race schema is completed
    it('should create races', () => {
        return schedule()
            .then( () => {
                return Race.find().lean();
            })
            .then( races => {
                assert
            });

    });
});