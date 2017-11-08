const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RequiredString = require('../utils/required-string');

const planetSchema = new Schema ({
    name: RequiredString
});

planetSchema.statics.getRandomPlanetId = function () {
    return this.aggregate([{
        $sample: { size: 1 }
    }]).then(([ planet ]) => planet._id);
};

module.exports = mongoose.model('Planet', planetSchema);