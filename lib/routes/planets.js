const router = require('express').Router();
const superagent = require('superagent');

router 
    .get('/', (req, res, next) => {
        const catalogArr = Array(7).fill();        
        
        return Promise.all(
            catalogArr.map((item, i) => {
                const planetsUrl = `https://swapi.co/api/planets/?page=${i+1}`;
                return superagent.get(planetsUrl)
                    .then(planetRes => planetRes.body.results);
            })
        )
            .then((pages) => {
                const planets = pages.reduce((acc, page) => {
                    return acc.concat(page);
                }, []);
                res.json(planets);
            })
            .catch(next);
    });

module.exports = router;