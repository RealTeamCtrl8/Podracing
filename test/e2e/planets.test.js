const  {assert} = require('chai');
const request = require('./request');
const db = require('./db');
const planetSeed = require('../../lib/scripts/seed-planets');

// see characters.test.js, same applies here...

describe('Planets test', () => {
    let userToken = null;
    let newUser = null;

    beforeEach(function () {
        
        db.drop();
        this.timeout(15000);
        return planetSeed()
            .then( () =>{
                newUser = {
                    name: 'xXcYbEr_GoKu_666Xx',
                    email: '10_yr_old_hacker@gmail.com',
                    password: '123hello'
                };
        
                return request
                    .post('/api/users/signup')
                    .send(newUser)
                    .then(({ body }) => {
                        userToken = body.token;
                    });                
            });
    });

    it('should retrieve all planets from API', function() {
        this.timeout(15000);
        return request 
            .get('/api/planets/')
            .set('Authorization', userToken)
            .then(({body}) => {
                assert.equal(body.length, 61);
            });
    });
});