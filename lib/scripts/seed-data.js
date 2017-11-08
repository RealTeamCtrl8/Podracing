const superagent = require('superagent');
const Character = require('../models/character');
const Planet = require('../models/planet');
const Vehicle = require('../models/vehicle');

const characters = seed(Character, 'people', 9);
const planets = seed(Planet, 'planets', 7);
const vehicles = seed(Vehicle, 'vehicles', 4);

// for testing, exporting these separately...
module.exports = {
    characters,
    planets,
    vehicles,
    data() {
        return Promise.all(
            characters(),
            planets(),
            vehicles()
        );
    }
};

function seed(Model, resource, pages) {

    return () => {
        Model.find().count()
            .then(count => {
                if (count === 0) {
                    return importData();
                }
            });
    };

    function importData() {    
        return Promise.all(
            Array(pages).fill().map((item, i) => {
                const url = `https://swapi.co/api/${resource}/?page=${i + 1}`;
                return superagent.get(url)
                    .then(({ body }) => body.results);
            })
        )
            .then((pages) => {
                return pages.reduce((acc, page) => acc.concat(page), []);
            })
            .then(results => {
                return Promise.all (
                    results.map(data => new Model(data).save())
                );
            });
    }
}
