const Race = require('../models/race');
const User = require('../models/user');
// const Planet = require('../models/planet');

module.exports = function () {
//TODO: Stetch goal- Refactor to be more simple. Async maybe?
    return Race.find()
        .where('active').equals('true')
        .where('endTime').gt(Date.parse(new Date))
        .then( found =>{
            Promise.all(
                found.map(race => {
                    if(race.users.lenth < 2){
                        return Race.findByIdAndRemove(race.id)
                            .then( () => User.findByIdAndRemove(race.users[0].id));
                    } else {
                        const raceWinner = Math.floor(Math.random() * race.users.length);
                        const winnerId = race.users[raceWinner].toString();
                        let winnerBankroll = null;
                        return User.findById(winnerId).select('bankroll')
                            .then( found => {
                                winnerBankroll = found.bankroll;
                            })
                            .then( () => {
                                winnerBankroll += race.prize;
                                return User.findByIdAndUpdate(winnerId, {bankroll: winnerBankroll }, {new: true});
                            })
                            .then( () => {
                                return Race.findByIdAndUpdate(race.id, {active: false, winner: winnerId});
                            });
                    }

                })//end of map
            );
        });
        

};

// TODO: Use vehicle speed and random numbers to determine outcome of race
raceFinish = function () {
    let comp = null;
    let user = null;

    comp = (Math.floor(Math.random() * 100) + 1);
    user = (Math.floor(Math.random() * 100) + 1);

    if (user > comp) {
        return 'user wins';
    } else {
        return 'user losses';
    }
};
