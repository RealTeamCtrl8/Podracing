const { assert } = require('chai');
const request = require('./request');
const db = require('./db');


describe('Auth test', () => {
    let userToken = null;
    let newUser = null;
    beforeEach( async () => {
        
        db.drop();

        newUser = {
            name: 'xXcYbEr_GoKu_666Xx',
            email: '10_yr_old_hacker@gmail.com',
            password: '123hello'
        };

        const { body } = await request
            .post('/api/users/signup')
            .send(newUser);
        
        userToken = body.token;
    });

    describe('signup tests', () => {
        it('should create a user token on signin', () => {
            assert.ok(userToken);
        });

        it('should reject user with no password', () => {
            const badUser = {
                name: 'bad',
                email: 'bad@bad.org'
            };
            return request
                .post('/api/users/signup')
                .send(badUser)
                .then(() => {throw new Error ('unexpected success');})
                .catch( err => {
                    assert.equal(err.status, 401);
                }); 
        });
    });

    describe('Signin tests', () => {
        // it('should sign in with same account info', async () => {
        //     const {body} = await request
        //         .post('/api/users/signin')
        //         .send({
        //             name: 'xXcYbEr_GoKu_666Xx',
        //             password: '123hello'
        //         })
        //         .then(body => assert.ok(body.token));
        // });

        it('should return error with invalid password signin', () => {
            newUser.password = 'bad';
            return request
                .post('/api/users/signin')
                .send(newUser)
                .then(() => {throw new Error('unexpected success');})
                .catch(err => {assert.equal(err.status, 401);});
        });
    });
});