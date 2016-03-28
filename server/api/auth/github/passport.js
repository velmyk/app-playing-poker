const
    passport = require('passport'),
    GithubStrategy = require('passport-github').Strategy;

const
    setup = (User) => {
    
        passport.use(new GithubStrategy({
                clientID: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callbackURL: process.env.GITHUB_CALLBACK_URL
            }, 
            function (accessToken, refreshToken, profile, done) {
                User.findOne({githubId: profile.id}).exec()
                    .then(user => {
                        if (user) {
                            return done(null, user);
                        }
                        user = new User({
                            name: profile.username,
                            githubId: profile.id,
                            salt: 'String',
                            hashedPassword: 'String'
                        });
                        user.save()
                            .then(user => done(null, user))
                            .catch(err => {
                        done(err)});
                    })
                    .catch(err => {
                        done(err);
                    });
              }));

    };

module.exports = {
    setup: setup
};