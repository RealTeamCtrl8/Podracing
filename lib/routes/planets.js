const router = require('express').Router();
const Planet = require('../../lib/models/planet');
const validateAuth = require('../utils/validateAuth')();

router 
    .get('/', validateAuth, (req, res, next) => {
        return Planet.find().lean()
            .then( found => {
                return res.json(found);
            })
            .catch(next);
    });

module.exports = router;