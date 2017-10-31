const { assert } = require('chai');
const request = require('./request');
const db = require('./db');

let newUser = null;
let userToken = null;
describe.only('Characters test', () => {
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

    it('should retrieve all characters from api', () => {
        return request.get('/api/characters?page=1')
            .then( ({body}) => {
                assert.ok(body[0].name);
            });
    });

});