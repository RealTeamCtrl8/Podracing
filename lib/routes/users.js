const router = require('express').Router();
const User = require('../models/user');
const Vehicle = require('../models/vehicle');
const respond = require('../utils/respond');
const tokenService = require('../utils/token');
const validateAuth = require('../utils/validateAuth')();


module.exports = router

    .post('/signup', respond( async req => {
        const { password } = req.body;
        delete req.body.password;


        if (!password) {
            throw { code: 401, error: 'password required' };
        }

        const userObject = {
            name: req.body.name,
            email: req.body.email,
            password: password,
            bankroll: 20000,
        };

        const user = new User(userObject);
        user.generateHash(userObject.password);

        await user.save();
        const userToken =  await tokenService.sign(user);

        return { token: userToken };
        
    }))

    .post('/signin', respond( async req => {
        const { name, password} = req.body;
        delete req.body.password;

        if (!password) throw { code: 400, error: 'password required' };
        
        const user = await User.findOne( { name } );
        if( !user || !user.comparePassword(password)) {
            throw { code: 401, error: 'invalid login'};
        }

        const myToken = await tokenService.sign(user);
        return { token: myToken };

    }))

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
                return User.findByIdAndUpdate(userId, { character: req.params.id }, {new: true}).select('name email character');
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
                return User.findByIdAndUpdate(userId, updated, {new: true}).select('name email vehicle');
            })
            .then( updated => {
                res.json(updated);
            })
            .catch(next);
    });