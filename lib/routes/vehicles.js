const router = require('express').Router();
const validateAuth = require('../utils/validateAuth')();
const Vehicle = require('../models/vehicle');

router
    .get('/', validateAuth, (req, res, next) => {
        Vehicle.find().lean()
            .then(vehicles => res.json(vehicles))
            .catch(next);
    });

module.exports = router;