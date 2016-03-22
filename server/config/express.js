'use strict';

let express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    errorHandler = require('errorhandler'),
    passport = require('passport'),
    path = require('path'),
    cors = require('cors');
    // session = require('express-sessions');

const expressSetup = (app) => {
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(cors())
    app.use(methodOverride());
    app.use(cookieParser());
    // app.use(session({secret: 'mysecret'}));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static(__dirname + './../../target/build'));

    if ('production' === process.env.NODE_ENV) {
        app.use(morgan('dev'));
    }

    if ('development' === process.env.NODE_ENV || 'test' === process.env.NODE_ENV) {
        app.use(morgan('dev'));
        app.use(errorHandler()); // Error handler - has to be last
    }
};

module.exports = expressSetup;