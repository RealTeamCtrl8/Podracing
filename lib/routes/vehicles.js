const router = require('express').Router();
const superagent = require('superagent');

router
    .get('/', (req, res) => {
        const pageArr = [];
        const catalogArr = Array(3).fill();

        return Promise.all(
            catalogArr.map((item, i) => {
                const vehiclesUrl = `https://swapi.co/api/vehicles/?page=${i+1}`;
                return superagent.get(vehiclesUrl)
                    .then(vehicleRes => {
                        const results = vehicleRes.body.results;
                        results.forEach(items => {
                            pageArr.push(items);
                        });
                    })
                    .catch(err => console.log(err));
            })
        )
            .then(res.json(catalogArr));
    });

module.exports = router;