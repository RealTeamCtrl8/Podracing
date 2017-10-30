const router = require('express').Router();
const User = require('../models/user');
const respond = require('../utils/respond');
const tokenService = require('../utils/token');

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
        
    }));