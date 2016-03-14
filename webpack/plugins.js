'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var SpritesmithPlugin = require('webpack-spritesmith');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var PolyfillsPlugin = require('webpack-polyfills-plugin');
var PATHS = require('./webpack-paths');

module.exports = [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
        template: PATHS.src.app + '/index.html',
        inject: false
    }),
    new ExtractTextPlugin('app.css', {
        allChunks: true
    }),
    new SpritesmithPlugin({
        src: {
            cwd: PATHS.src.app + '/images',
            glob: '*.png'
        },
        target: {
            image: PATHS.build + '/sprite.png',
            css: PATHS.src.app + '/scss/sprite.scss'
        },
        apiOptions: {
            cssImageRef: '../.' + PATHS.build + '/sprite.png'
        }
    }),
    new webpack.DefinePlugin({
        ENV: JSON.stringify(env.ui)
    }),
    new PolyfillsPlugin([
        'Array/prototype/find'
    ])
];