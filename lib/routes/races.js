const router = require('express').Router();
const Race = require('../models/race');
// const Planet = require('../../lib/models/planet');

router
    .post('/', (req, res, next) => {
        new Race(req.body).save()
            .then(race => res.json(race))
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Race.find()
            .select('name _id')
            .lean()
            .then(race => res.json(race))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        const id = req.params.id;
        return Race.findById(id)
            .select('endTime planet._id')
            .lean()
            .then(race => res.json(race))
            .catch(next);
    });

module.exports = router;