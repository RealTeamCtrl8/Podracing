const router = require('express').Router();
const superagent = require('superagent');

router
    .get('/', (req, res) => {
        const pageArr = [];
        const catalogArr = Array(2).fill();
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