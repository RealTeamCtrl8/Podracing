const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RequiredString = require('../utils/required-string');

const planetSchema = new Schema ({
    name: RequiredString
});



module.exports = mongoose.model('Planet', planetSchema);