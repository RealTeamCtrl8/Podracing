const router = require('express').Router();
const superagent = require('superagent');
const validateAuth = require('../utils/validateAuth')();

const charactersUrl = 'https://swapi.co/api/people/';

router
    .get('/', validateAuth, (req, res) => {
        return superagent.get(charactersUrl)
            .then( got => {
                res.send(got.body.results);
            });
    });


module.exports = router;