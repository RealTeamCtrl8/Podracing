const { assert } = require('chai');
const request = require('./request');
const db = require('./db');
const seedCharacters = require('../../lib/scripts/seed-characters');
const Character = require('../../lib/models/character');
const User = require('../../lib/models/user');

describe('User Character test', () => {
    
    let newUser = null;
    let userToken = null;

    beforeEach(function () {
        this.timeout(10000);
        db.drop();

        newUser = new User({
            name: 'xXcYbEr_GoKu_666Xx',
            email: '10_yr_old_hacker@gmail.com',
            password: '123hello'
        });
        
        return request
            .post('/api/users/signup')
            .send(newUser)
            .then( ({body}) => {
                userToken = body.token;
                return seedCharacters();
            });
    });

    it.only('should get a character by id and add to user property', () => {
        let sample = null;
        return Character.findOne().lean()
            .then(found => {
                sample = found;
            })
            .then(() => request.get(`/api/users/getchar/${sample._id}`)
                .set('Authorization', userToken)
            )    
            .then(got => {
                assert.equal(sample.name, got.body.name);
            });
    });

    it('should reject character putById when user already has character', () => {
        //TODO: can this line be declared at the beginning of the file?
        const tokenService = require('../../lib/utils/token');
        const userWithCharacter = new User({
            name: 'online_user_2422352',
            email: '11_yr_old_hacker@gmail.com',
            password: '123hello',
            character: 'dumbledore'
        });

        //TODO: remove user token garbage
        let sample = null;
        let userId = null;

        return request
            .post('/api/users/signup')
            .send(userWithCharacter)
            .then( ({body}) => {
                userToken = body.token;
                return tokenService.verify(userToken);
            })
            .then( got => {
                userId = got.id;
                return Character.findOne().lean();
            })
            .then(found => {
                sample = found;
            })
            .then(() => request.get(`/api/users/getchar/${sample._id}`)
                .set('Authorization', userToken)
            )    
            .then(
                () => { throw new Error('unexpected success'); },
                (err) => assert.equal(err.status, 400)
            );
    });

});
