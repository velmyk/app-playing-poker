const   passport = require('passport'),
        GithubStrategy = require('passport-github').Strategy;

const   setup = (User, config) => {
    
    passport.use(new GithubStrategy({
          clientID: '4bd3e99c3cfd161d9071',
          clientSecret: '4a1cf85a9eda09ae6a7fa08206fb6415ffd7cb72',
          callbackURL: 'https://playing-poker.herokuapp.com'
        }, 
        function (accessToken, refreshToken, profile, done) {
            console.log(accessToken, refreshToken, profile, done);
            done(null, {
                accessToken: accessToken,
                profile: profile
            });
        })
    );


    // passport.use(new LocalStrategy({
    //         usernameField: 'login',
    //         passwordField: 'password' // this is the virtual field on the model
    //     },
    //     (name, password, done) => {
    //         return User.findOne({
    //                 name: {$regex: new RegExp("^" + name + "$", "i")}
    //             })
    //             .then(user => {
    //                 if (user && user.authenticate(password)) {
    //                     done(null, user);
    //                 }
    //                 else {
    //                     done(null, false);
    //                 }
    //             })
    //             .catch(err => done(err));
    //     })
    // )
};

module.exports = {
    setup: setup
};