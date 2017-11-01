const router = require('express').Router();
const Race = require('../models/race');


router
    .post('/', (req, res, next) => {
        new Race(req.body).save()
            .then(race => res.json(race))
            .catch(next);
    });


module.exports = router;