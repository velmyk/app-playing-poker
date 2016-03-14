var PATHS = require('./webpack-paths');

module.exports = {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase: PATHS.build,
    stats: 'errors-only',
    host: env.webpackServer.host,
    port: env.webpackServer.port,
    quiet: false,
    proxy: [
        {
            path: '/api/v1/*',
            target: {
                host: env.webpackServer.host,
                port: env.fakeApiServer.port
            }
        }
    ]
};