'use strict';

const 	path = require('path');

module.exports = (app) => {

    app
    	.use('/api', require('./api'))

    	.get('/*', function (req, res) {
	        res.sendFile('index.html');
	    });

};