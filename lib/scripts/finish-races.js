const Race = require('../models/race');
const User = require('../models/user');

module.exports = function () {
//TODO: Stetch goal- Refactor to be more simple. Async maybe?
    console.log('Processing completed races...');
    return Race.find()
        .where('active').equals('true')
        .where('endTime').gt(Date.parse(new Date))
        .then( found =>{
            Promise.all(
                found.map(race => {
                    if(race.users.length < 2){
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
                                return User.findByIdAndUpdate(winnerId, {'bankroll': winnerBankroll }, {new: true});
                            })
                            .then( () => {
                                return Race.findByIdAndUpdate(race.id, {active: false, winner: winnerId});
                            });
                    }
                })
            );
        });
};