var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MoodSchema = new Schema({
    name: String,
    valence: Number,
    arousal: Number
});

var MoodRecordingSchema = new Schema({
    created: { type: Date, default: Date.now },
    mood: { type: [Mood], required: true }
});

var UserSchema = new Schema({
    id : String,
    moodRecordings : [MoodRecordingSchema]
})


module.exports = mongoose.model('MoodSchema', MoodSchema);
module.exports = mongoose.model('MoodRecordingSchema', MoodRecordingSchema);
module.exports = mongoose.model('UserSchema', UserSchema);