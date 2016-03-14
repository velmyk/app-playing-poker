'use strict';

global.env = require('./env');

const
    webpack = require('webpack'),
    devServer = require('./webpack/dev-server'),
    plugins = require('./webpack/plugins'),
    loaders = require('./webpack/loaders').dev,
    PATHS = require('./webpack/webpack-paths'),
    logEnv = require('./env/log');

logEnv(global.env);

module.exports = {
    entry: PATHS.app,
    output: {
        path: PATHS.build,
        filename: 'app.js'
    },
    module: {
        preloaders: [{
            test: /\.scss$/,
            loaders: 'import-glob-loader'
        }],
        loaders: loaders
    },
    plugins: plugins,
    devServer: devServer
};