const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const RequiredString = require('../utils/required-string');

const raceSchema = new Schema ({
    planet: {
        type: Schema.Types.ObjectId,
        ref: 'Planet',
        required: true
    },
    raceLog:[{
        planet: String,
        race: String,
        winner: String
    }],
    logger: [],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

});

let distance = null;
let prize = null;

raceSchema.statics.RaceDetails = function(){
    distance = (Math.floor(Math.random() * (10000 -100 +1)) +100)*12;
    prize = distance / 6;
    return {
        planetArray: this.planet,//todo get 1 random planet from the array
        distance: distance, 
        prize: prize
    };
};

raceSchema.methods.raceLogger = function () {
    let comp = null;
    let user = null;
    
    const raceWinning = function(){
        comp = (Math.floor(Math.random() * (10 - 1 + 1)) + 1);
        user = (Math.floor(Math.random() * (10 - 1 + 1)) + 1);
        if(user > comp){
            return 'user wins';
        } else {
            return 'user losses';
        }
    };

    raceWinning();
    this.logger.push(raceWinning());
};


module.exports = mongoose.model('Race', raceSchema);