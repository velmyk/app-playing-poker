var webpack = require('webpack');
var loaders = require('./webpack/loaders').test;

module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        singleRun: true,
        frameworks: ['mocha', 'sinon-chai', 'chai'],
        files: [
            'test.config.js'
        ],
        preprocessors: {
            'test.config.js': ['webpack', 'sourcemap']
        },
        reporters: ['dots', 'coverage'],
        coverageReporter: {
            reporters: [
                {type: 'lcov', dir: 'coverage/', subdir: '.'},
                {type: 'json', dir: 'coverage/', subdir: '.'},
                {type: 'text'}
            ]
        },
        webpack: {
            devtool: 'eval',
            module: {
                loaders
            }
        },
        webpackServer: {
            noInfo: true
        }
    });
};