
// required libraries
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');


var index = require('./routes/index');
var users = require('./routes/users');
var moods = require('./routes/moods');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// database acccess setup
var mongoose = require('mongoose');
var options = { server: { connectTimeoutMS: 10000 } };
// connect to the database
mongoose.connect('mongodb://admin:moodadmin@ds051893.mongolab.com:51893/ng-mood-db', options, function (err) {
    console.log(err);
});

// set up persistent session
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

app.use(session({
    secret: 'narsil',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    proxy: true,
    resave: true,
    saveUninitialized: true
}));


/*
// passport configuration
app.use(express.session());

// passport initialization
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Strategy(
    function (username, password, cb) {
        db.users.findByUsername(username, function (err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            if (user.password != password) { return cb(null, false); }
            return cb(null, user);
        });
    }));
*/


app.use('/', index);
app.use('/index', index);
app.use('/users', users);
app.use('/moods', moods);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
