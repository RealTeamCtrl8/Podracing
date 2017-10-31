const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const raceSchema = new Schema ({
    planet: {
        type: Schema.Types.ObjectId,
        ref: 'Planet',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    endTime: Date
    // allRaces: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Race',
    //     required: true
    // }]
    //todo: insert log of races here
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

raceSchema.methods.raceFinish = function () {
    let comp = null;
    let user = null;

    comp = (Math.floor(Math.random() * 10) + 1);
    user = (Math.floor(Math.random() * 10) + 1);
    if (user > comp) {
        return 'user wins';
    } else {
        return 'user losses';
    }
};

raceSchema.methods.raceTime = function (seconds) {
    new Date(new Date().getTime() + 1000 * seconds);
};



module.exports = mongoose.model('Race', raceSchema);