const router = require('express').Router();
const superagent = require('superagent');

router 
    .get('/', (req, res) => {
        const pageArr = [];
        const catalogArr = Array(6).fill();        
        
        return Promise.all(
            catalogArr.map((item, i) => {
                const planetsUrl = `https://swapi.co/api/planets/?page=${i+1}`;
                return superagent.get(planetsUrl)
                    .then(planetRes => {
                        const results = planetRes.body.results;
                        results.forEach(items => {
                            pageArr.push(items);
                        });
                    })
                    .catch(err => console.log(err));
            })
        )
            .then(() => res.json(pageArr));
    });

module.exports = router;