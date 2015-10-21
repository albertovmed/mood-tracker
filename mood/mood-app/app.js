var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var uuid = require('node-uuid');

var index = require('./routes/index');
var tracker = require('./routes/moodHome');


var app = express();
// sets port 3000 to default or unless otherwise specified in the environment
app.set('port', process.env.PORT || 8088);

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

// session setup
app.use(session({
  genid: function(req) {
    return uuid.v1() // use UUIDs for session IDs
  },
  cookie: { httpOnly: false },
  proxy: true,
  resave: true,
  saveUninitialized: true,
  name: 'moodcookie',
  secret: 'moodapi0041'
}));


app.use('/', index);
app.use('/index', index);
app.use('/tracker', tracker);

// enable CORS
app.use(function(req, res, next) {
  // enable the cookie to remain for only the duration of the user-agent.
  req.session.cookie.expires = false;
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();
});


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
