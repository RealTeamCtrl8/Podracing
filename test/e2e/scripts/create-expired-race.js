const Race = require('../../../lib/models/race');
const Planet = require('../../../lib/models/planet');
const User = require('../../../lib/models/user');

// You're doing too much here that is identical to code.
// Either 1) simply and just save some dummy data, 
// 2) use the existing model functions, then modify the data you need.

module.exports = function () {
    let enemy = { name: 'Your rival', email: 'finalboss@aol.com', bankroll: 0 };
    let hero = { name: 'gyro', email: 'goodboy111@aol.com', bankroll: 1000 };

    let date = new Date();
    date.setSeconds(date.getSeconds() - 1000 );

    return new User(hero).save()
        .then( () => new User(enemy).save())
        .then( (got) => {
            enemy = got;
            return Planet.aggregate([
                { $sample: { size: 1 } }
            ]);
        })
        .then( myPlanet => {
            const randomNumber = (Math.floor(Math.random() * (10000 - 100 +1)) +100)*12;
            const newRace = {
                planet: myPlanet[0]._id,
                endTime: date,
                active: true,
                distance: randomNumber,
                prize: randomNumber / 6,
                users: [enemy, hero]
            };
            return new Race(newRace).save();
        });
};