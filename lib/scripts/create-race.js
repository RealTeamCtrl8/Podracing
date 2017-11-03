const Race = require('../models/race');
const Planet = require('../models/planet');


module.exports = function () {
    //TODO
    ///generate random planetDONE
    //generate random distance and prize DONE
    //save new race schema to races db
    // let planetArray = null;   
    return Planet.aggregate([
        { $sample: { size: 1 } }
    ])
        .then( myPlanet => {
            const randomNumber = (Math.floor(Math.random() * (10000 -100 +1)) +100)*12;
            const newRace = {
                planet: myPlanet[0]._id,
                endTime: Date.parse(new Date) + (process.env.CREATETIMER || 1000),
                active: true,
                distance: randomNumber,
                prize: randomNumber / 6
            };
            return new Race(newRace).save();
        })
        .catch(err => {
            console.log(err);
        });
};