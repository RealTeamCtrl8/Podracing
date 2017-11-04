const router = require('express').Router();
const Race = require('../models/race');
const validateAuth = require('../utils/validateAuth')();

router
    .post('/', validateAuth, (req, res, next) => {
        new Race(req.body).save()
            .then(race => res.json(race))
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Race.find()
            .select('name _id endTime')
            .where('endTime').gt(Date.parse(new Date))
            .populate({path: 'planet', select: 'name'})
            .lean()
            .then(race => res.json(race))
            .catch(next);
    });

module.exports = router;