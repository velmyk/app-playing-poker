'use strict';

require('dotenv').config();

const 	express = require('express'),
	 	mongoose = require('mongoose');

const 	app = express(),
		server = require('http').createServer(app);

mongoose.Promise = require('q').Promise;
mongoose.connect(process.env.MONGODB_URI, new Boolean(process.env.MONGO_OPTIONS_DB_SAFE));
mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error: ' + err);
        process.exit(-1);
    }
);

require('./server/config/express')(app);
require('./server/api/poker')(server);
require('./server/routes')(app);

server.listen(process.env.PORT, process.env.IP, () => {
    console.log(`Express server listening on ${process.env.PORT}, in ${process.env.NODE_ENV} mode`);
});

exports = module.exports = app;
