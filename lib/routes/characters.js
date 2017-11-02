const router = require('express').Router();
const validateAuth = require('../utils/validateAuth')();
const Character = require('../models/character');

router
    .get('/', validateAuth, (req, res, next) => {
        Character.find().lean()
            .then(found => res.json(found))
            .catch(next);
    });

module.exports = router;