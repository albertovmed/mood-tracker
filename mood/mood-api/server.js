var http = require('http');
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var port = process.env.PORT || 8080;        // set our port


// Connect to the database
var mongoose = require('mongoose');
var Schema       = mongoose.Schema;
var url = 'mongodb://moodadmin:m00dadmin@ds051893.mongolab.com:51893/ng-mood-db';

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

mongoose.connect(url, options);

// Create schemas
var MoodSchema = new Schema({
    name: String,
    valence: Number,
    arousal: Number
});

var MoodRecordSchema = new Schema({
    userid :  String,
    created: { type: Date, default: Date.now },
    mood   : { type: [MoodSchema], required: true },
    description : String
});


var MoodRecord = mongoose.model('MoodRecord', MoodRecordSchema);

mongoose.connection.on('open', function (ref) {
    connected=true;
    console.log('open connection to mongo server.');
});

mongoose.connection.on('connected', function (ref) {
    connected=true;
    console.log('connected to mongo server.');
});

mongoose.connection.on('disconnected', function (ref) {
    connected=false;
    console.log('disconnected from mongo server.');
});

mongoose.connection.on('close', function (ref) {
    connected=false;
    console.log('close connection to mongo server');
});

mongoose.connection.on('error', function (err) {
    connected=false;
    console.log('error connection to mongo server!');
    console.log(err);
});

mongoose.connection.db.on('reconnect', function (ref) {
    connected=true;
    console.log('reconnect to mongo server.');
});

// Routes for the mood - api
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// Middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Call to the mood-api');
    next(); // make sure we go to the next routes and don't stop here
});

// Test route to make sure everything is working
// (access at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'To call the mood-tracking API use \'/api\' sufix' });
});

// Register api routes -------------------------------
// All of our routes will be prefixed with /api
app.use('/api', router);

router.route('/moods')

    // Create a moodRecord (accessed at POST http://localhost:8080/api/moods)
    .post(function(req, res) {

        var moodRecord = new MoodRecord();
        moodRecord.userid = req.body.userid;
        moodRecord.mood = req.body.mood;
        moodRecord.description = req.body.description;
        console.log(moodRecord);

        // save the moodRecord and check for errors
        moodRecord.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Success' });
        });
    });


// Start the server
// =============================================================================
app.listen(port);
console.log('api running on port ' + port);
