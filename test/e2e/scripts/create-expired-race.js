const Race = require('../../../lib/models/race');
const Planet = require('../../../lib/models/planet');
const User = require('../../../lib/models/user');

//TODO: move this to test folder. update all require urls
module.exports = function () {
    
    
    let enemy = { name: 'Your rival', email: 'finalboss@aol.com' };
    let hero = { name: 'gyro', email: 'goodboy111@aol.com' };

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
                endTime: Date.parse(new Date) - 1000,
                active: true,
                distance: randomNumber,
                prize: randomNumber / 6,
                users: [enemy, hero]
            };
            return new Race(newRace).save();
        })
        .catch(err => {
            console.log(err);
        });
};