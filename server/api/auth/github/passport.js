const   passport = require('passport'),
        GithubStrategy = require('passport-github').Strategy;

const   config = require('../../../config/environment');

const   setup = (User, config) => {
    
    passport.use(new GithubStrategy({
          clientID: config.github.clientID,
          clientSecret: config.github.clientSecret,
          callbackURL: config.github.callbackURL
        }, 
        function (accessToken, refreshToken, profile, done) {
            console.log('Strat');
            User.findOne({githubId: profile.id}).exec()
              .then(user => {
                console.log('user');
                if (user) {
                  return done(null, user);
                }
                // console.log(profile);
                user = new User({
                    name: profile.username,
                    githubId: profile.id,
                    salt: 'String',
                    hashedPassword: 'String'
                });
                user.save()
                  .then(user => done(null, user))
                  .catch(err => {
                console.log(2);
                done(err)});
              })
              .catch(err => {
                console.log(1);
                done(err)});
          }));

};

module.exports = {
    setup: setup
};