const express = require('express');
const router = express.Router();
const passport = require('../passport/localStrategy');
const LoginController = require('../controllers/login.controller');

router.get('/', LoginController.index);
router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

module.exports = router;
