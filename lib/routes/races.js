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
            .select('name _id endTime')
            .where('endTime').gt(Date.parse(new Date))
            .populate({path: 'planet', select: 'name'})
            .lean()
            .then(race => res.json(race))
            .catch(next);
    })
    // TODO: add prize to select
    .put('/joinRace/:id', (req, res, next) => {
        const id = req.params.id;
        return Race.findById(id)
            .select('endTime planet._id')
            .lean()
            .then(race => {
                if(!race) next ({ code: 404, message: 'Incorrect id' }); 
                else res.json(race); 
            })
            .catch(next);
    })
    //  TODO: is this a necessary method because no manual finishRace thing the user will do
    .put('/finishRace/:id', (req, res, next) => {
        const id = req.params.id;
        return Race.findById(id)
            .select('endTime planet._id')
            .lean()
            .then(race => {
                if(!race) next ({ code: 404, message: 'Incorrect id'}); 
                else res.json(race); 
            })
            .catch(next);
    });

module.exports = router;