/**
 * Express configuration
 */

'use strict';

let express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    errorHandler = require('errorhandler'),
    passport = require('passport'),
    path = require('path'),
    _ = require('lodash'),
    cors = require('cors');

let config = require('./environment');

const expressSetup = (app) => {
    var env = app.get('env');
    _.assign(app.locals, config.locals);
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(cors())
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static(__dirname + '/target/build'));

    if ('production' === env) {
        app.use(morgan('dev'));
    }

    if ('development' === env || 'test' === env) {
        app.use(morgan('dev'));
        app.use(errorHandler()); // Error handler - has to be last
    }
};

module.exports = expressSetup;