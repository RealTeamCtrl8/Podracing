const finishRaces = require('./finish-races');
const createRace = require('./create-race');

module.exports = function() {

    //TODO: SET timer to good values
    const createRaceTimer = setInterval(createRace, 1000);
    const finishRacesTimer = setInterval(finishRaces, 1000000);

    process.on('SIGINT', () => {
        console.log('switching off timers...');
        clearInterval(createRaceTimer);
        clearInterval(finishRacesTimer);
    });

};