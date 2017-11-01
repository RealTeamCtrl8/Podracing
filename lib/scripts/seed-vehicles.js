const superagent = require('superagent');
const Vehicle = require('../models/vehicle');

module.exports = function () {
    return Vehicle.find().count()
        .then(count => {
            if(count === 0) {
                return importVehicles();
            }
        });
};

function importVehicles() {
    const catalogArr = Array(4).fill();

    return Promise.all( 
        catalogArr.map((item, i) => {
            const vehiclesUrl = `https://swapi.co/api/vehicles/?page=${i+1}`;
            return superagent.get(vehiclesUrl)
                .then(vehicleRes => vehicleRes.body.results);
        })
    )
        .then(pages => {
            return pages.reduce((acc, page) => {
                return acc.concat(page);
            }, []);
        })
        .then(vehicles => {
            return Promise.all(
                vehicles.map((vehicles) => {
                    return new Vehicle(vehicles).save();
                })
            );
        });
}