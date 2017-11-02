const { assert } = require('chai');
const request = require('./request');
const db = require('./db');


//TODO: convert asyncs to oldschool promises (for consistency)
describe.only('Auth test', () => {
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

        it('should reject user with no password', async () => {
            try {
                const badUser = {
                    name: 'bad',
                    email: 'bad@bad.org'
                };
                await request
                    .post('/api/users/signup')
                    .send(badUser);
                throw new Error ('unexpected success');
            }
            catch (err) {
                assert.equal(err.status, 401);
            } 
        });
    });

    describe('Signin tests', () => {
        it('should sign in with same account info', async () => {
            const {body} = await request
                .post('/api/users/signin')
                .send({
                    name: 'xXcYbEr_GoKu_666Xx',
                    password: '123hello'
                });
            assert.ok(body.token);
        });

        it('should return error with invalid password signin', async () => {
            try{
                newUser.password = 'bad';
                await request
                    .post('/api/users/signin')
                    .send(newUser);
                throw new Error('unexpected success');
            }
            catch(err) {
                assert.equal(err.status, 401);
            }
        });

    });
});