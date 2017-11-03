const Race = require('../models/race');
const Planet = require('../models/planet');

const createRace = function() {
    let foundPlanet = null;   
    return Planet.findOne().lean() 
        .then(found => {
            foundPlanet = found;
        })
        .then( () => {
            return new Race({
                planet: foundPlanet._id,
                endTime: Date.parse(new Date) + process.env.CREATETIMER || 1000,
                active: true,
                distance: 200,
                prize: 100
            });
        });
};

module.exports = createRace;