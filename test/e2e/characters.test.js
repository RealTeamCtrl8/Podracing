const { assert } = require('chai');
const request = require('./request');
const db = require('./db');

let newUser = null;
let userToken = null;
describe('Characters test', () => {
    beforeEach(()=> {
        db.drop();

        newUser = {
            name: 'xXcYbEr_GoKu_666Xx',
            email: '10_yr_old_hacker@gmail.com',
            password: '123hello'
        };
    });


    it('should retrieve all characters from api', function()  {
        this.timeout(15000);
        return request
            .post('/api/auth/signup')
            .send(newUser)
            .then( ({body}) => {
                userToken = body.token;
            });
    });

    it('should retrieve all characters from api when requested from authorized user', () => {
        return request.get('/api/characters')
            .set('Authorization', userToken)
            .then( ({body}) => {
                assert.isArray(body);
                assert.ok(body[1].name);
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
