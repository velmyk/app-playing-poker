const   passport = require('passport'),
        GithubStrategy = require('passport-github').Strategy;

const   setup = (User, config) => {
    
    passport.use(new GithubStrategy({
          clientID: '4bd3e99c3cfd161d9071',
          clientSecret: '4a1cf85a9eda09ae6a7fa08206fb6415ffd7cb72',
          callbackURL: 'http://localhost:9000/api/auth/github/auth/callback'
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