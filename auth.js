const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const con = require('./db');
const bcrypt = require('bcryptjs');

// LocalStrategy for authenticate
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (username, password, done) => {
  con.query(`
    SELECT * FROM users WHERE email='${username}'
    `, (error, result) => {
      if(error) return done(error);

      if(result.length == 0) {
        return done(null, false, { message: 'Incorrect username!' });
      }

      if(!bcrypt.compareSync(password, result[0].password)) {
        return done(null, false, { message: 'Incorrect password!' });
      }

      return done(null, result[0]);
    });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  con.query(`
    SELECT * FROM users WHERE id='${id}'
    `, (error, result) => {
      done(error, result[0]);
    });
});

module.exports = passport;
