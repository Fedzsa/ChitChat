const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { User } = require('../models/index');

const SignUpController = require('../controllers/signup.controller');

router.get('/', SignUpController.index);
router.post('/', [
  body('username').notEmpty().isString().custom((value, { req }) => {
    return User.findOne({ where: { username: req.body.username } }).then(user => {
      if(user) throw new Error('Username already in use');
    })
  }),
  body('email').notEmpty().isString().isEmail().custom((value, { req }) => {
    return User.findOne({ where: { email: req.body.email } }).then(user => {
      if(user) throw new Error('Email already in use');
    })
  }),
  body('password').notEmpty().isString(),
  body('confirmPassword').notEmpty().isString().custom((value, { req }) => {
    if(value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }

    return true;
  })
], SignUpController.store);

module.exports = router;
