'use strict';

const   express = require('express'),
        passport = require('passport');

const   auth = require('../auth.service'),
        router = express.Router();

router
    .get('/auth', passport.authenticate('github'))
    .get('/auth/error', auth.error)
    .get('/auth/callback',
        passport.authenticate('github', {failureRedirect: '/auth/error'}),
        auth.setTokenCookie
    );

module.exports = router;