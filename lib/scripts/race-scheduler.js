const finishRaces = require('./finish-races');
const createRace = require('./create-race');

module.exports = function() {

    const createRaceTimer = setInterval(createRace, 10000);
    const finishRacesTimer = setInterval(finishRaces, 19000);

    process.on('SIGINT', () => {
        console.log('switching off timers...');
        clearInterval(createRaceTimer);
        clearInterval(finishRacesTimer);
    });

};