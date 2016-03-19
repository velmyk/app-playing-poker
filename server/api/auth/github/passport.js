const   passport = require('passport'),
        GithubStrategy = require('passport-github').Strategy;

const   setup = (User, config) => {
    
    passport.use(new GithubStrategy({
          clientID: '4bd3e99c3cfd161d9071',
          clientSecret: '4a1cf85a9eda09ae6a7fa08206fb6415ffd7cb72',
          callbackURL: 'https://playing-poker.herokuapp.com/api/auth/github/auth/callback'
        }, 
        function (accessToken, refreshToken, profile, done) {
            console.log(accessToken, refreshToken, profile, done);
            done(null, {
                accessToken: accessToken,
                profile: profile
            });
        })
    );

};

module.exports = {
    setup: setup
};