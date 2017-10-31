const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const RequiredString = require('../utils/required-string');

const eventSchema = new Schema ({
    planet: {
        type: Schema.Types.ObjectId,
        ref: 'Planet',
        required: true
    },
    eventLog:[{
        planet: String,
        race: String,
        winner: String
    }],
});

let distance = null;
let prize = null;

eventSchema.statics.raceDetails = function(){
    distance = (Math.floor(Math.random() * (10000 -100 +1)) +100)*12;
    prize = distance / 6;
    return {
        planetArray: eventSchema.planet,//todo get 1 random planet from the array
        distance: distance, 
        prize: prize
    };
};

// eventSchema.methods.eventLogger = function () {
//     let logger = [];
//     let eventResults = null;
//     let comp = null;
//     let user = null;
    
//     function raceWinning(){
//         comp = (Math.floor(Math.random() * (10 - 1 + 1)) + 1);
//         user = (Math.floor(Math.random() * (10 - 1 + 1)) + 1);
//         if(user > comp){
//             return 'user wins';
//         }
//     }

//     logger.push(eventResults);


// };


module.exports = mongoose.model('Event', eventSchema);