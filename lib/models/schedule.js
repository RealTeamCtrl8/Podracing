const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema ({
    allRaces: [{
        type: Schema.Types.ObjectId,
        ref: 'Race',
        required: true
    }]
    //todo: insert log of races here

});



scheduleSchema.methods.raceFinish = function () {
    let comp = null;
    let user = null;

    comp = (Math.floor(Math.random() * (10 - 1 + 1)) + 1);
    user = (Math.floor(Math.random() * (10 - 1 + 1)) + 1);
    if(user > comp){
        return 'user wins';
    } else {
        return 'user losses';
    }
};


module.exports = mongoose.model('Schedule', scheduleSchema);