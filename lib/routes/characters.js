const router = require('express').Router();
const superagent = require('superagent');

router
    .get('/', (req, res) => {
        return Promise.all(Array(10).fill().map((item, i) => {
            const charactersUrl = `https://swapi.co/api/people/?page=${i}`;
            return superagent.get(charactersUrl)
                .then(characterRes => {
                    res.send(characterRes.body.results);
                });
        }));
    });

module.exports = router;