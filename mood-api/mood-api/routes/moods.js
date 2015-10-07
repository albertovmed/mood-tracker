var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('mood');
});

router.post('/', function (req, res) {
    var Mood = require('/models/Mood');
    Mood.insert(req.body.mood)
    console.long(req.body);
});

module.exports = router;