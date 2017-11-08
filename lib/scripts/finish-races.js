/* eslint no-console: "off" */
const Race = require('../models/race');
const User = require('../models/user');

module.exports = function () {
    console.log('Processing completed races...');
    // look at level of nesting, usually indicates you're not chaining promises correctly
    
    return Race.getExpiredRaces().then(races =>{
        // Two techniques that help here:
        // Separate two primary conditions (delete vs run) using filter
        // Use functions to name logic and break things up
        return Promise.all([runValidRaces(races), cancelEmptyRaces(races)]);
    });
};

function runValidRaces(races) {
    const runRaces = races
        .filter(race => race.users.length > 1)
        .map(race => {
            // what about vehicle speed, etc., etc.???
            const raceWinner = Math.floor(Math.random() * race.users.length);
            // You shouldn't need to use `toString`, but I'm not 100% sure
            const winnerId = race.users[raceWinner];

            // Parallel actions!
            return Promise.all([
                // define model methods to keep this clean
                User.findByIdAndWinPrize(winnerId, race.prize),
                race.complete()
            ]);
        });

    return Promise.all(runRaces);
}

function cancelEmptyRaces(races) {
    return Promise.all(
        races
            .filter(race => race.users.length <= 1)
            .map(race => race.cancel())
    );
}