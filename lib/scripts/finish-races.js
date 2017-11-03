const Race = require('../models/race');
// const Planet = require('../models/planet');
// const User = require('../models/user');

module.exports = function () {

    return Race.find()
        .where('active').equals('true')
        .where('endTime').gt(Date.parse(new Date))
        .then( found =>{
            Promise.all(
                found.map(race => {
                    console.log('===========', race);
                    if(race.users.lenth < 2){
                        return Race.findByIdAndRemove(race.id);
                    // } else {

                    }

                })
            );
        });
        

};

// TODO: Use vehicle speed and random numbers to determine outcome of race
// raceFinish = function () {
//     let comp = null;
//     let user = null;

//     comp = (Math.floor(Math.random() * 100) + 1);
//     user = (Math.floor(Math.random() * 100) + 1);

//     if (user > comp) {
//         return 'user wins';
//     } else {
//         return 'user losses';
//     }
// };
