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
    endTime: Number,
    distance: Number,
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


//TODO: Use vehicle speed and random numbers to determine outcome of race
raceSchema.methods.raceFinish = function () {
    let comp = null;
    let user = null;

    comp = (Math.floor(Math.random() * 100) + 1);
    user = (Math.floor(Math.random() * 100) + 1);
    
    if (user > comp) {
        return 'user wins';
    } else {
        return 'user losses';
    }
};



module.exports = mongoose.model('Race', raceSchema);