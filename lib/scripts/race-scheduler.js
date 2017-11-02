const checkPlaceholder = require('./race-runner');
const createPlaceholder = require('./create-race');

module.exports = function() {

    const checkRaces = setInterval(checkPlaceholder, 1000);
    const createRaces = setInterval(createPlaceholder, 5000);

    process.on('SIGINT', () => {
        console.log('switching off timers...');
        clearInterval(checkRaces);
        clearInterval(createRaces);
    });

};