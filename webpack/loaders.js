var ExtractTextPlugin = require('extract-text-webpack-plugin');

var jsRegexp = /\.js?$/;

var loaders = {
    js: {
        test: jsRegexp,
        exclude: /node_modules/,
        loader: "babel",
        query: {
            presets: ['es2015', 'stage-0']
        }
    },
    html: {
        test: /\.html$/,
        loader: 'raw'
    },
    coverage: {
        test: jsRegexp,
        loader: 'isparta',
        exclude: /node_modules|\.spec.js$/
    },
    font: {
        test: /\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'base64-font-loader'
    },
    scss: {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass!import-glob-loader')
    },
    sprites: {
        test: /\.png$/,
        loader: 'file?name=sprite.[ext]'
    },
    annotate: {
        test: jsRegexp,
        loader: 'ng-annotate'
    }
};

module.exports = {
    test: [loaders.js, loaders.coverage, loaders.html],
    dev: [loaders.annotate, loaders.js, loaders.html, loaders.font, loaders.scss, loaders.sprites]
};