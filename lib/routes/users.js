const router = require('express').Router();
const User = require('../models/user');
const Character = require('../models/character');
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

    .get('/getchar/:id', validateAuth, (req, res, next) => {
        Character.findById(req.params.id).lean()
            .then(found => res.json(found))
            .catch(next);
    });