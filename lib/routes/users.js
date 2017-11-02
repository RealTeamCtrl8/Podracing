const router = require('express').Router();
const User = require('../models/user');
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

        const user = new User(req.body);
        user.generateHash(password);

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
    });
