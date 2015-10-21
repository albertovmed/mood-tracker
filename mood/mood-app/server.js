var debug = require('debug')('mood_app');
var app = require('./app');

app.set('port', 8088);

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});
