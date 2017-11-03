const router = require('express').Router();
const User = require('../models/user');
const Vehicle = require('../models/vehicle');
const Race = require('../models/race');
const tokenService = require('../utils/token');
const validateAuth = require('../utils/validateAuth')();

module.exports = router
    .post('/signup', (req, res, next) => {
        const { password } = req.body;
        delete req.body.password;
    
        if (!password) {
            throw { code: 401, error: 'password required' };
        }
        
        const user = new User(req.body);
        user.bankroll = 50000;
        user.generateHash(password);
        return user.save()
            .then(user => tokenService.sign(user))
            .then(token => res.send({ token }))
            .catch(next);  
    })

    .post('/signin', (req, res, next) => {
        const { name, password} = req.body;
        delete req.body.password;

        if (!password) throw { code: 400, error: 'password required' };
        
        User.findOne( { name } )
            .then(user => {
                if( !user || !user.comparePassword(password)) {
                    throw { code: 401, error: 'invalid login'};
                }
                return tokenService.sign(user);
            })
            .then(token => res.send({token}))
            .catch(next);
    })

    .put('/getchar/:id', validateAuth, (req, res, next) => {
        let userId = null;
        const token = req.get('Authorization');
        return tokenService.verify(token)
            .then( payload => {
                userId = payload.id;
                return User.findById(userId).lean();
            })
            .then( found => {
                if (found.character) throw {code: 400, error: 'you already have a character'};
                return User.findByIdAndUpdate(userId, { character: req.params.id }, {new: true}).select('name email character vehicle bankroll');
            })
            .then( updated => {
                res.json(updated);
            })
            .catch(next);
    })

    .put('/clearchar/:id', validateAuth, (req, res, next) => {
        let userId = null;
        const token = req.get('Authorization');
        return tokenService.verify(token)
            .then( payload => {
                userId = payload.id;
                return User.findByIdAndUpdate(userId, {character: null}, {new: true});
            })
            .then( updated => {
                res.json(updated);
            })
            .catch(next);
    })

    .put('/getvehicle/:id', validateAuth, (req, res, next) => {
        let userId = null;
        let userBankroll = null;
        let savedVehicle = null;
        const token = req.get('Authorization');
        return tokenService.verify(token)
            .then( payload => {
                userId = payload.id;
                return User.findById(userId).lean();
            })
            .then( found => {
                userBankroll = found.bankroll;
                return Vehicle.findById(req.params.id);
            })
            .then( found => {
                savedVehicle = found;
                if(savedVehicle.cost_in_credits > userBankroll) throw {code: 400, error: 'insufficient funds'};
                userBankroll -= savedVehicle.cost_in_credits;
                let updated = {
                    vehicle: savedVehicle.id,
                    bankroll: userBankroll
                };
                return User.findByIdAndUpdate(userId, updated, {new: true})
                    .select('name email character vehicle bankroll');
            })
            .then( updated => {
                res.json(updated);
            })
            .catch(next);
    })

    .put('/joinRace/:id', validateAuth, (req, res, next) => {
        let userId = null;
        const token = req.get('Authorization');
        const id = req.params.id;
        return tokenService.verify(token)
            .then( payload => {
                userId = payload.id;
                return Race.findByIdAndUpdate(id, {$push: {users: userId}}, {new : true} ).lean();
            })
            .then( race => {
                if(!race) next ({ code: 404, message: 'Incorrect id' }); 
                else res.json(race); 
            })
            .catch(next);
    });