const
    mongoose = require('mongoose'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    expressJwt = require('express-jwt'),
    compose = require('composable-middleware');

const
    User = require('../user/user.model');

const
    validateJwt = expressJwt({
        secret: process.env.SEACRETS_SESSION,
        getToken: function(req) {
            return req.cookies.token && JSON.parse(req.cookies.token);
        }
    });

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
const
    isAuthenticated = () => {
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
const
    signToken = (id) => {
        return jwt.sign({_id: id}, process.env.SEACRETS_SESSION, {expiresIn: 60 * 5});
    };

/**
 * Set token cookie directly for oAuth strategies
 */
const
    setTokenCookie = (req, res) => {
        if (!req.user) {
            return res.status(404).json({message: 'Something went wrong, please try again.'});
        }
        var token = signToken(req.user._id);
        res.cookie('token', JSON.stringify(token));
        res.redirect('/');
    };

const
    error = (req, res) => {
        res.send('Login Failed');
    };

module.exports = {
    isAuthenticated: isAuthenticated,
    signToken: signToken,
    setTokenCookie: setTokenCookie,
    error: error
};