const router = require('express').Router();
const superagent = require('superagent');
const validateAuth = require('../utils/validateAuth')();

router
    .get('/', validateAuth, (req, res) => {
        const pageArr = [];
        const catalogArr = Array(8).fill();
        return Promise.all(
            catalogArr.map((item, i) => {
                const charactersUrl = `https://swapi.co/api/people/?page=${i+1}`;
                return superagent.get(charactersUrl)
                    .then(characterRes => {
                        const results = characterRes.body.results;
                        results.forEach(items => {
                            pageArr.push(items);
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
        )
            .then(res.json(catalogArr));
    });

module.exports = router;