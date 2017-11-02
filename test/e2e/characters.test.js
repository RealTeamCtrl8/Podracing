const { assert } = require('chai');
const request = require('./request');
const db = require('./db');
const seedCharacters = require('../../lib/scripts/seed-characters');
const User = require('../../lib/models/user');

describe('Characters test', () => {
    
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

    it('should retrieve all characters from api when requested from authorized user', function() {
        this.timeout(15000);
        return request.get('/api/characters')
            .set('Authorization', userToken)
            .then( ({body}) => {
                assert.equal(body.length, 87);
            });
    });

});
