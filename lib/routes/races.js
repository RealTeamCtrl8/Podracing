const router = require('express').Router();
const Race = require('../models/race');


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
    });
// .get('/:id', (req, res, next) => {
//     const id = req.params.id;
//     Promise.all([
        
//     ])
// });

module.exports = router;