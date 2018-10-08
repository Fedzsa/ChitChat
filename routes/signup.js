const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
const con = require('../db');

// GET, POST Sign up page
router.route('/').get((req, res, next) => {
  res.render('registration');
}).post((req, res, next) => {
  // Registration occured

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
        con.query(`
          INSERT INTO users (id, username, email, password) VALUES ('${uuidv4()}', '${req.body.username}', '${req.body.email}', '${hash}')
          `, (error) => {
            if(error) throw error;
          });
    });
  });

  res.redirect('/login');
});

module.exports = router;
