const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RequiredString = require('../utils/required-string');

const userSchema = new Schema ({
    name: RequiredString,
    email: RequiredString,
    password: String,
    character: {
        type: Schema.Types.ObjectId,
        ref: 'Character' 
    }
});

module.exports = mongoose.model('User', userSchema);