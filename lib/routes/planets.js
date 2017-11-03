const router = require('express').Router();
const Planet = require('../../lib/models/planet');

router 
    .post('/', (req, res, next) => {
        new Planet(req.body).save()
            .then(post => res.json(post))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        return Planet.find()
            .then( found => {
                return res.json(found);
            })
            .catch(next);
    });

module.exports = router;