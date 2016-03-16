'use strict';

const 	express = require('express'),
		passport = require('passport');

const	config = require('../../config/environment'),
		User = require('../user/user.model'),
		router = express.Router();

require('./local/passport').setup(User, config);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

router.use('/local', require('./local'));

router.use('/logout', (req, res) => {
    req.logout();
    res.cookie('token', null);
    res.send();
});

module.exports = router;