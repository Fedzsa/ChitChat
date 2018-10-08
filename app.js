const express = require('express');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const body_parser = require('body-parser');
const session = require('express-session');
const passport = require('./auth');
const flash = require('connect-flash');

const app = express();
const PORT = 3000;

// Import routers
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');

// Set port
app.set('port', PORT);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use some usefull stuff
app.use(express.static(path.join(__dirname, 'public')));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Use flash for authenticate flash messages
app.use(flash());

// Setup passport
app.use(passport.initialize());
app.use(passport.session());

// GLOBAL vars
app.use((req, res, next) => {
  res.locals.error = req.flash('error');
  // If user logged in then the variable gets the user
  res.locals.user = req.user || null;
  next();
});

// Use router
app.use('/home', isAuthenticated, indexRouter);
app.use('/login', isLoggedIn, loginRouter);
app.use('/signup', isLoggedIn, signupRouter);

// Log out
app.get('/logout', (req, res, next) => {
  req.logout();

  res.redirect('/login');
});

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO
const io = require('socket.io')(server);
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

// Run server in localhost:3000
server.listen(PORT);

// The function handles the authentication
function isAuthenticated(req, res, next) {

  // Check the user is authenticated
  if(req.isAuthenticated())
    return next();

  // If the user isn't authenticate then we send to the login page
  res.redirect('/login');
}

function isLoggedIn(req, res, next) {

  if(req.isAuthenticated())
    res.redirect('/home');

  return next();
}
