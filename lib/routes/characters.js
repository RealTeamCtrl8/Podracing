const router = require('express').Router();
const validateAuth = require('../utils/validateAuth')();
const Character = require('../models/character');

router
    .get('/', validateAuth, (req, res, next) => {
        Character.find().lean()
            .then(characters => res.json(characters))
            .catch(next);
    });

module.exports = router;