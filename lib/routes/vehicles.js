const router = require('express').Router();
const superagent = require('superagent');

router
    .get('/', (req, res, next) => {
        const catalogArr = Array(4).fill();

        return Promise.all( 
            catalogArr.map((item, i) => {
                const vehiclesUrl = `https://swapi.co/api/vehicles/?page=${i+1}`;
                return superagent.get(vehiclesUrl)
                    .then(vehicleRes => vehicleRes.body.results);
            })
        )
            .then((pages) => {
                const vehicles = pages.reduce((acc,page) => {
                    return acc.concat(page);
                }, []);
                res.json(vehicles);
            })
            .catch(next);
    });

module.exports = router;