const Race = require('../models/race');
const Planet = require('../models/planet');
const User = require('../models/user');


module.exports = function () {
    
    let enemy = { name: 'Your rival', email: 'finalboss@aol.com', bankroll: 0 };

    return new User(enemy).save()
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
                endTime: Date.parse(new Date) + (process.env.CREATETIMER || 1000),
                active: true,
                distance: randomNumber,
                prize: randomNumber / 6,
                users: [enemy]
            };
            return new Race(newRace).save();
        })
        .catch(err => {
            console.log(err);
        });
};