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

        return request
            .post('/api/auth/signup')
            .send(newUser)
            .then( ({body}) => {
                userToken = body.token;
                console.log(userToken);
            });
    });

    it.only('should retrieve all characters from api when requested from authorized user', () => {
        return request.get('/api/characters')
            .set('Authorization', userToken)
            .then( ({body}) => {
                console.log(body);
                assert.ok(body[0].name);
            });
    });

});