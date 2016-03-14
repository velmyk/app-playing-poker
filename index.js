// 'use strict';

// const 	express = require('express');

// const	app = express();

// let server = require('http').createServer(app);

// require('dotenv').load();

// app.use('/', express.static(__dirname + '/client'));
// require('./server/socket')(server);

// app.listen(process.env.SERVER_PORT, err => {
// 	err ? console.error(err) : console.log('Express server listening on port ' + process.env.SERVER_PORT);
// });
'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

var config = require('./server/config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function (err) {
        console.error('MongoDB connection error: ' + err);
        process.exit(-1);
    }
);

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./server/config/express')(app);
require('./server/config/socket')(server);

require('./server/routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
