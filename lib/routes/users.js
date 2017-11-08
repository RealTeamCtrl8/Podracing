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
        // because you're not enforcing name uniqueness, 
        // once second user chooses same name, one of the two accounts
        // will be forever broken :(
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

    // not sure why you are re-authenticating user when validateAuth
    // has already done this work. The middleware puts the payload on req.user

    // REST paths are resources, meaning nouns. 
    // "getchar" is neither a noun, nor does it match a PUT
    // A user has a subresource of a character.
    .put('/character/:id', validateAuth, (req, res, next) => {
        // "PUT" means put this resource in this place. So doesn't make sense
        // to throw an error if they already have a character, just replace
        return User
            .findByIdAndUpdate(req.user.id, { character: req.params.id }, { new: true })
            .select('name email character vehicle bankroll')
            .then(updated => res.json(updated))
            .catch(next);
    })

    // Doesn't make sense to clear a character, wouldn't you just replace?

    .put('/vehicle/:id', validateAuth, (req, res, next) => {
        Promise.all([
            User.findById(req.user.id),
            Vehicle.findById(req.params.id)
        ])
            .then(([user, vehicle]) => {
                // TODO: throw error if no vehicle
                const cost = vehicle.cost_in_credits;
                if(cost > user.bankroll) throw {code: 400, error: 'insufficient funds'};

                user.bankroll -= cost;
                user.vehicle = vehicle._id;
                return user.save();
            })
            .then(({ _id, name, email, character, vehicle, bankroll }) => {
                // bit of a hack, but avoids second trip to database
                return { _id, name, email, character, vehicle, bankroll };
            })
            .then(updated => res.json(updated))
            .catch(next);
    });

// this needs to live on race route, not user
// .put('/joinRace/:id', validateAuth, (req, res, next) => {
//     let userId = null;
//     const token = req.get('Authorization');
//     const id = req.params.id;
//     return tokenService.verify(token)
//         .then( payload => {
//             userId = payload.id;
//             return Race.findByIdAndUpdate(id, {$push: {users: userId}}, {new : true} ).lean();
//         })
//         .then( race => {
//             if(!race) next ({ code: 404, message: 'Incorrect id' }); 
//             else res.json(race); 
//         })
//         .catch(next);
// });