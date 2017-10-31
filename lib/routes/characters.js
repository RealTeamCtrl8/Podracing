const router = require('express').Router();
const superagent = require('superagent');

const charactersUrl = 'https://swapi.co/api/people/';

router
    .get('/', (req, res) => {
        return superagent.get(charactersUrl)
            .then( got => {
                res.send(got.body.results);
            });
    });


module.exports = router;