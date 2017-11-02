const Race = require('../models/race');
const Planet = require('../models/planet');
const createRaces = require('../scripts/race-scheduler');
const request = require('../../test/e2e/request');

module.exports = function() {
    let randomPlanet =  function() {
        Planet.findOne().lean() 
            .then()
            .catch(next);
    };


    let createRace = function(newRace) {
        const testRace = new Race({
            planet: randomPlanet._id,
            endTime: new Date + createRaces,
            active: true,
            prize: `${prize}`
        });
    };
};