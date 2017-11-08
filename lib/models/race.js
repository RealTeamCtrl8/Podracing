const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const raceSchema = new Schema({
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
    distance: Number,
    active: {
        type: Boolean,
        required: true
    },
    prize: {
        type: Number,
        required: true
    },
    winner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

raceSchema.statics.getExpiredRaces = function() {
    // shouldn't these be "less than" current date?
    return this.find({active: true, endTime: {$lt: new Date()}});
};

raceSchema.statics.getAvailableRaces = function() {
    // Don't they need to be active too?
    return this.find({active: true, endTime: {$gt: new Date()}});
};

raceSchema.statics.findByIdAndAddUser = function(userId) {
    // can't register twice, use $addToSet
    return this.findByIdAndUpdate(this.id, { $addToSet: { users: userId } }, { new : true } )
        .lean()
        .then(race => {
            if(!race) throw { code: 404, message: 'Incorrect id' }; 
            return race;
        });
};

raceSchema.methods.cancel = function() {
    return Promise.all([
        this.remove(),
        User.findByIdAndRemove(this.users[0])
    ]);
};

raceSchema.methods.complete = function(winner) {
    this.active = false;
    this.winner = winner;
    return this.save();
};

module.exports = mongoose.model('Race', raceSchema);