'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const 	express = require('express'),
	 	mongoose = require('mongoose');

const 	config = require('./server/config/environment'),
		app = express(),
		server = require('http').createServer(app);

mongoose.Promise = require('q').Promise;
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error: ' + err);
        process.exit(-1);
    }
);

require('./server/config/express')(app);
require('./server/api/poker')(server);
require('./server/routes')(app);

server.listen(config.port, config.ip, () => {
    console.log(`Express server listening on ${config.port}, in ${app.get('env')} mode`);
});

exports = module.exports = app;
