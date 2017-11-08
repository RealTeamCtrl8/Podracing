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
        // nice job on query, select, populate for this find.
        // I moved get race login into Race model
        Race.getAvailableRaces()
            .select('name _id endTime')
            .populate({path: 'planet', select: 'name'})
            .lean()
            .then(race => res.json(race))
            .catch(next);
    })
    
    .put('/:id/users', validateAuth, (req, res, next) => {
        return Race.findByIdAndAddUser(req.params.id, req.user.id)
            .then(race => res.json(race))
            .catch(next);
    });

module.exports = router;