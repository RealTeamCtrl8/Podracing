const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RequiredString = require('../utils/required-string');

const characterSchema = new Schema ({
    name: RequiredString
});

module.exports = mongoose.model('Character', characterSchema);