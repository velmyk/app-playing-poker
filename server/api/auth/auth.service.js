'use strict';

const   mongoose = require('mongoose'),
        passport = require('passport'),
        jwt = require('jsonwebtoken'),
        expressJwt = require('express-jwt'),
        compose = require('composable-middleware');

const   User = require('../user/user.model'),
        config = require('../../config/environment');

const   validateJwt = expressJwt({
    secret: config.secrets.session,
    getToken: function(req) {
        return req.cookies.token && JSON.parse(req.cookies.token);
    }
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
const   isAuthenticated = () => {
    return compose()
    // Validate jwt
        .use(validateJwt)
        // Attach user to request
        .use(function (req, res, next) {
            User.findOne({_id: req.user._id})
                .then(function (user) {
                    if (!user) {
                        return res.status(401).send('Unauthorized');
                    }
                    req.user = user;
                    next();
                })
                .catch(function (err) {
                    return next(err);
                });
        });
}

/**
 * Returns a jwt token signed by the app secret
 */
const   signToken = (id) => {
    return jwt.sign({_id: id}, config.secrets.session, {expiresIn: 60 * 5});
}

/**
 * Set token cookie directly for oAuth strategies
 */
const   setTokenCookie = (req, res) => {
    if (!req.user) {
        return res.status(404).json({message: 'Something went wrong, please try again.'});
    }
    var token = signToken(req.user._id);
    res.cookie('token', JSON.stringify(token));
    console.log('setTokenCookie');
    res.send(req.user);
}

const   callback = (req, res) => {
    console.log(req.user);
    console.log('GH callback');
  // In the real application you might need to check 
  // whether the user exits and if exists redirect 
  // or if not you many need to create user.
  res.send({message: 'Login success', data: req});
};

const   error = (req, res) => {
    console.log('GH err');
  res.send('Login Failed');
};

module.exports = {
    isAuthenticated: isAuthenticated,
    signToken: signToken,
    setTokenCookie: setTokenCookie,
    callback: callback,
    error: error
};