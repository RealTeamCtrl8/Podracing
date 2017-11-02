const { assert } = require('chai');
const request = require('./request');
const db = require('./db');
const seedCharacters = require('../../lib/scripts/seed-characters');
const seedVehicles = require('../../lib/scripts/seed-vehicles');
const Character = require('../../lib/models/character');
const User = require('../../lib/models/user');
const Vehicle = require('../../lib/models/vehicle');


describe('User routes test', () => {

    let newUser = null;
    let userToken = null;

    beforeEach(function () {
        this.timeout(10000);
        db.drop();

        newUser = new User({
            name: 'xXcYbEr_GoKu_666Xx',
            email: '10_yr_old_hacker@gmail.com',
            password: '123hello',
            bankroll: '20000'
        });
    
        return request
            .post('/api/users/signup')
            .send(newUser)
            .then( ({body}) => {
                userToken = body.token;
            });
    });

    describe('Character route tests', () => {
        beforeEach( function()  {
            this.timeout(10000);
            return seedCharacters();
        });

        it('should get a character by id and add to user property', () => {
            let sample = null;
            return Character.findOne().lean()
                .then(found => {
                    sample = found;
                })
                .then(() => request.put(`/api/users/getchar/${sample._id}`)
                    .set('Authorization', userToken)
                )    
                .then(got => {
                    assert.ok(got.body.character);
                });
        });

        it('should reject character putById when user already has character', () => {
            const userWithCharacter = new User({
                name: 'online_user_2422352',
                email: '11_yr_old_hacker@gmail.com',
                password: '123hello',
                character: '59fa55bf389b3782d8cceac7'
            });

            let userToken = null;
            let sample = null;

            return request
                .post('/api/users/signup')
                .send(userWithCharacter)
                .then(({body}) => {
                    userToken = body.token;
                })
                .then(() => {
                    return Character.findOne().lean()
                        .then(found => {
                            sample = found;
                        })
                        .then(() => request.put(`/api/users/getchar/${sample._id}`)
                            .set('Authorization', userToken)
                        )    
                        .catch(err => {
                            assert.equal(err.status, 400);
                        });
                });    
        });
    

    });

    describe.only('Vehicle route tests', () => {
        beforeEach( function()  {
            this.timeout(10000);
            return seedVehicles();
        });

        it('should get a vehicle by id and add to user property if affordable', () => {
            let sample = null;

            return Vehicle.find().where('cost_in_credits').lt(20000).lean()
                .then(found => {
                    sample = found[0];
                })
                .then(() => request.put(`/api/users/getvehicle/${sample._id}`)
                    .set('Authorization', userToken)
                )    
                .then(got => {
                    assert.ok(got.body.vehicle);
                });
        });
       
        it('should throw err if vehicle cost is gt bankroll', () => {
            let sample = null;

            return Vehicle.find().where('cost_in_credits').gt(30000).lean()
                .then(found => {
                    sample = found[0];
                })
                .then(() => request.put(`/api/users/getvehicle/${sample._id}`)
                    .set('Authorization', userToken)
                )    
                .then(() => {
                    throw new Error ('unexpected success');
                })
                .catch(err => {
                    assert.equal(err.status, 400);
                });
        });

        
    });


});