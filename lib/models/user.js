const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const RequiredString = require('../utils/required-string');

const userSchema = new Schema ({
    name: RequiredString,
    email: RequiredString,
    password: String,
    character: {
        type: Schema.Types.ObjectId,
        ref: 'Character' 
    },
    hash: String
});

userSchema.methods.generateHash = function(password) {
    this.hash = bcrypt.hashSync(password, 7);
};


module.exports = mongoose.model('User', userSchema);