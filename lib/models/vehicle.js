const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RequiredString = require('../utils/required-string');

const vehicleSchema = new Schema ({
    name: RequiredString,
    cost_in_credits: {
        type: Number,
        required: true
    },
    max_atmosphering_speed: RequiredString
});

module.exports = mongoose.model('Vehicle', vehicleSchema);