const { validationResult } = require('express-validator');
const { User } = require('../models/index');
const bcrypt = require('bcryptjs');

exports.index = async (req, res, next) => {
    console.log('GET /signup')
    res.render('signup');
};

exports.store = async (req, res, next) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });

    return res.sendStatus(201);
};