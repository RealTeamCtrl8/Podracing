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
    endTime:Number

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



module.exports = mongoose.model('Race', raceSchema);