const express = require('express');
const router = express.Router();
const con = require('../db');
const passport = require('../auth');

// GET Login page
router.route('/').get((req, res, next) => {
  // Display login screen
  res.render('login');
}).post(passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
}));

module.exports = router;
