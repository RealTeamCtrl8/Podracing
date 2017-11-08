const Race = require('../models/race');
const Planet = require('../models/planet');
const User = require('../models/user');

// My making this explicit, next developer doesn't have to reverse engineer how it works
const DISTANCE_MULTIPLIER = 12;
const MIN = 100;
const MAX = 10000;
const getRandomDistance = () => {
    return (Math.floor(Math.random() * (MAX - MIN + 1)) + MIN) * DISTANCE_MULTIPLIER;
};

module.exports = function () {
    console.log('Creating new race...');// eslint-disable-line
    
    // Why not pull from Character using $sample as well? 
    const enemy = {
        name: 'Your rival',
        email: 'finalboss@aol.com',
        bankroll: 0
    };
    
    // these are parallel actions!
    return Promise.all([
        new User(enemy).save(),
        Planet.getRandomPlanetId()
    ])
        .then(([enemy, planet]) => {
            // move date to where it is used
            let date = new Date();
            date.setSeconds(date.getSeconds() + (process.env.CREATETIMER || 1000));        

            // I made this a function to better explain what is going on here
            const distance = getRandomDistance();
            const newRace = {
                // handle pruning in actual find if possible
                planet,
                endTime: date,
                active: true,
                distance,
                prize: distance / 6,
                users: [enemy]
            };
            return new Race(newRace).save();
        });
};