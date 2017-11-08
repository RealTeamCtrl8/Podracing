const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const RequiredString = require('../utils/required-string');

const userSchema = new Schema ({
    name: RequiredString,
    email: RequiredString,
    character: {
        type: Schema.Types.ObjectId,
        ref: 'Character' 
    },
    vehicle: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle' 
    },
    hash: String,
    bankroll: Number
});

userSchema.methods.generateHash = function(password) {
    this.hash = bcrypt.hashSync(password, 7);
};

userSchema.methods.comparePassword = function(pass) {
    return bcrypt.compareSync(pass, this.hash);
};

userSchema.statics.findByIdAndWinPrize = function(userId, prize) {
    // Retrieve, adjust, and save same user object
    this.findById(userId).then(user => {
        user.bankroll += prize;
        return user.save();
    });
};

module.exports = mongoose.model('User', userSchema);