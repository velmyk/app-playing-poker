module.exports = {
	context: __dirname + '/client/src/app',
	entry: './app.js',
	output: {
		path: __dirname + '/client/src',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: './client/src',
	            loader: 'babel-loader'
	        }
        ]
    }
};