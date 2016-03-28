const
	express = require('express'),
	passport = require('passport');

const
	User = require('../user/user.model'),
	router = express.Router();

require('./local/passport').setup(User);
require('./github/passport').setup(User);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// passport.serializeUser(function(user, done) {
//   // for the time being tou can serialize the user 
//   // object {accessToken: accessToken, profile: profile }
//   // In the real app you might be storing on the id like user.profile.id 
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//   // If you are storing the whole user on session we can just pass to the done method, 
//   // But if you are storing the user id you need to query your db and get the user 
//   //object and pass to done() 
//   done(null, user);
// });

router.use('/local', require('./local'));
router.use('/github', require('./github'));

router.use('/logout', (req, res) => {
    req.logout();
    res.cookie('token', null);
    res.send();
});

module.exports = router;