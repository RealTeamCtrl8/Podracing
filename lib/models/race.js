const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const raceSchema = new Schema ({
    planet: {
        type: Schema.Types.ObjectId,
        ref: 'Planet',
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    endTime: Date,
    active: {
        type: Boolean,
        required: true //TODO: wherever race is Created, we need to default value to true
    },
    prize: {
        type: Number,
        required: true //TODO: wherever race is Created, we need to default value to true
    },
    winner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

let distance = null;
let prize = null;

raceSchema.statics.RaceScheduler = function(){
    distance = (Math.floor(Math.random() * (10000 -100 +1)) +100)*12;
    prize = distance / 6;
    return {
        distance: distance, 
        prize: prize
    };
};

//TODO: Use vehicle speed and random numbers to determine outcome of race
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