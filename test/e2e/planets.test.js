const  {assert} = require('chai');
const request = require('./request');
const db = require('./db');

describe('Planets test', () => {
    beforeEach(() => db.drop());

    it.only('should retrieve all planets from API', () => {
        return request 
            .get('/api/planets/')
            .then(({body}) => {
                assert.ok(body);
            });
    });
});