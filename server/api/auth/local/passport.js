const
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

const
    setup = (User) => {
        passport.use(new LocalStrategy({
                usernameField: 'name',
                passwordField: 'password' // this is the virtual field on the model
            },
            (name, password, done) => {
                return User.findOne({
                        name: {$regex: new RegExp('^' + name + '$', 'i')}
                    })
                    .then(user => {
                        if (user && user.authenticate(password)) {
                            done(null, user);
                        }
                        else {
                            done(null, false);
                        }
                    })
                    .catch(err => done(err));
            })
        );
    };

module.exports = {
    setup: setup
};