const router = require('express').Router();
const superagent = require('superagent');
const validateAuth = require('../utils/validateAuth')();

router
    .get('/', validateAuth, (req, res, next) => {
        const catalogArr = Array(9).fill();

        return Promise.all(
            catalogArr.map((item, i) => {
                const charactersUrl = `https://swapi.co/api/people/?page=${i + 1}`;
                return superagent.get(charactersUrl)
                    .then(characterRes => characterRes.body.results);
            })
        )
            .then((pages) => {
                const characters = pages.reduce((acc, page) => {
                    return acc.concat(page);
                },[] );
                res.json(characters);
            })
            .catch(next);
    });

module.exports = router;