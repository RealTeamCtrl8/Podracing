const superagent = require('superagent');
const Planet = require('../models/planet');

module.exports = function () {
    return Planet.find().count()
        .then(count => {
            if (count === 0) {
                return importPlanets();
            }
        });
};

function importPlanets() {
    const catalogArr = Array(7).fill();

    return Promise.all(
        catalogArr.map((item, i) => {
            const planetsUrl = `https://swapi.co/api/planets/?page=${i + 1}`;
            return superagent.get(planetsUrl)
                .then(planetRes => planetRes.body.results);
        })
    )
        .then((pages) => {
            return pages.reduce((acc, page) => {
                return acc.concat(page);
            }, []);
        })
        .then(planets => {
            return Promise.all (
                planets.map((planet) => {
                    return new Planet(planet).save();
                })
            );
        });
}