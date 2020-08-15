const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { User } = require('../models/index');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    let user = await User.findOne({ where: { email: email } });
    
    if(!user) return done(null, false, { message: 'Incorrect email or password' });
    
    if(!bcrypt.compareSync(password, user.password)) return done(null, false, { message: 'Incorrect email or password' });
    
    return done(null, user);
  }
));

passport.serializeUser(async (user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  let user = await User.findByPk(id);
  done(null, user);
});

module.exports = passport;
