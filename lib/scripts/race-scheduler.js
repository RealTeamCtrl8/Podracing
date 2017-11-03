const finishRaces = require('./finish-races');
const createRace = require('./create-race');

module.exports = function() {

    const createRaceTimer = setInterval(createRace, 100000000);
    const finishRacesTimer = setInterval(finishRaces, 60000000000);

    process.on('SIGINT', () => {
        console.log('switching off timers...');
        clearInterval(createRaceTimer);
        clearInterval(finishRacesTimer);
    });

};