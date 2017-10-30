/*eslint-disable*/

const { assert } = require('chai');
const request = require('./request');
const db = require('./db');

console.log('hi');

describe.only('Auth test', () => {
    let userToken = null;
    beforeEach( async () => {
        
        db.drop();

        const newUser = {
            name: 'xXcYbEr_GoKu_666Xx',
            email: '10_yr_old_hacker@gmail.com',
            password: '123hello'
        };

        const { body } = await request
            .post('/api/auth/signup')
            .send(newUser);
        
        userToken = body.token;

    });

    it('should create a user token on signin', () => {
        console.log('=========USER TOKEN IS', userToken)
        assert.ok(userToken);
    });


});