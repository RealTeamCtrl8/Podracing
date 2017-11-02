const router = require('express').Router();
const validateAuth = require('../utils/validateAuth')();
const Vehicle = require('../models/vehicle');

router
    .get('/', validateAuth, (req, res, next) => {
        Vehicle.find().lean()
            .then(found => res.json(found))
            .catch(next);
    });

module.exports = router;