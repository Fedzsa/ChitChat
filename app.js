const express = require('express');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./passport/localStrategy');
const flash = require('connect-flash');

const appConfig = require('./config/app.config');

const app = express();

// Import routers
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const logoutRouter = require('./routes/logout');

// Set port
app.set('port', appConfig.APP_PORT);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(session({
  secret: appConfig.SESSION_SECRET_KEY,
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
  res.locals.currentUser = req.user || null;

  res.locals.fontAwesomeUrl = appConfig.FONT_AWESOME_URL
  next();
});

// Use router
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/logout', logoutRouter);

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
server.listen(process.env.APP_PORT, () => {
  console.log(`App listening in port ${appConfig.APP_PORT}...`)
});
