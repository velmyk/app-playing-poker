'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,

  // MongoDB connection options
  mongo: {
    uri:    process.env.MONGOLAB_URI ||
            'mongodb://user:111111@ds011399.mlab.com:11399/playing-poker'
  },
  github: {
    clientID: '4bd3e99c3cfd161d9071',
    clientSecret: '4a1cf85a9eda09ae6a7fa08206fb6415ffd7cb72',
    callbackURL: 'https://playing-poker.herokuapp.com/api/auth/github/auth/callback'
  }
};