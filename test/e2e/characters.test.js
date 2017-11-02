const { assert } = require('chai');
const request = require('./request');
const db = require('./db');

describe('Characters test', () => {
    
    let newUser = null;
    let userToken = null;

    beforeEach(()=> {
        db.drop();

        newUser = {
            name: 'xXcYbEr_GoKu_666Xx',
            email: '10_yr_old_hacker@gmail.com',
            password: '123hello'
        };
        
        return request
            .post('/api/auth/signup')
            .send(newUser)
            .then( ({body}) => {
                userToken = body.token;
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
