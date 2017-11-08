const Race = require('../../../lib/models/race');
const Planet = require('../../../lib/models/planet');
const User = require('../../../lib/models/user');

// near identical to other create race test file.

module.exports = function () {    
    let enemy = { name: 'Your rival', email: 'finalboss@aol.com', bankroll: 0 };

    let date = new Date();
    date.setSeconds(date.getSeconds() - 1000);

    return new User(enemy).save()
        .then( (got) => {
            enemy = got;
            return Planet.aggregate([
                { $sample: { size: 1 } }
            ]);
        })
        .then( myPlanet => {
            // Don't repeat your code logic in the test. This does not need to be random as a dummy race
            const randomNumber = (Math.floor(Math.random() * (10000 - 100 +1)) +100)*12;
            const newRace = {
                planet: myPlanet[0]._id,
                endTime: date,
                active: true,
                distance: randomNumber,
                prize: randomNumber / 6,
                users: [enemy]
            };
            return new Race(newRace).save();
        });
};