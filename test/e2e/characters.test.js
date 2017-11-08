const { assert } = require('chai');
const request = require('./request');
const db = require('./db');
const seed = require('../../lib/scripts/seed-data');

describe('Characters test', () => {
    // make the test suite work for you.
    // before makes more sense here...
    
    before(db.drop);
    
    before(function () {
        this.timeout(10000);
        return seed.characters();
    });
    
    let userToken = null;
    before(() => {
        return request
            .post('/api/users/signup')
            .send({
                name: 'xXcYbEr_GoKu_666Xx',
                email: '10_yr_old_hacker@gmail.com',
                password: '123hello'
            })
            .then(({body}) => {
                userToken = body.token;
            });
    });

    it('should retrieve all characters from api when requested from authorized user', function() {
        // now that these are stored in your db, don't need length timeout
        return request.get('/api/characters')
            .set('Authorization', userToken)
            .then(({body}) => {
                assert.equal(body.length, 87);
            });
    });

    it('should reject attempt to get all characters from unauthorized user token', () => {
        return request.get('/api/characters')
            .set('Authorization', 'badtoken6666')
            .then( () => {
                throw new Error ('unexpected success');
            })
            .catch( err =>{
                assert.equal(err.message, 'Unauthorized');
            });
    });
});