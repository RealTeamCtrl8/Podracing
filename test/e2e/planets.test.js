const  {assert} = require('chai');
const request = require('./request');
const db = require('./db');

describe('Planets test', () => {
    beforeEach(() => db.drop());

    it('should retrieve all planets from API', function() {
        this.timeout(15000);
        return request 
            .get('/api/planets/')
            .then(({body}) => {
                assert.ok(body[0]);
            });
    });
});