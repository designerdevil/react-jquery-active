/* eslint-disable */
var path              = require('path'),
	webpack           = require('webpack'),
	OpenBrowserPlugin = require('open-browser-webpack-plugin');

var configServe = {
	port: 9100
};

module.exports = {
	devServer: {
		hot: true,
		inline: true,
		historyApiFallback: true,
		progress: true,
        // https:true,
		port: configServe.port,
        headers: { "Access-Control-Allow-Origin": "http://localhost:9100" }
	},

	entry: {
        "reduxboilerplate" : [
            'babel-polyfill',
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:' + configServe.port,
            path.resolve(__dirname, './src/index.jsx')
        ]
    },
	output: {
		path: __dirname,
		filename: '[name].bundle.js',
		publicPath: '/dist/'
	},
	module: {
		loaders: [
			{
				// JSX files :
				test: /\.js[x]?$/,
				include: path.resolve(__dirname, 'src'),
				exclude: /node_modules/,
				loader: 'react-hot!babel-loader?presets[]=react&presets[]=es2015'
			}
		]
	},

	plugins: [
		// Avoid publishing files when compilation fails
		new webpack.NoErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new OpenBrowserPlugin({ url: 'http://localhost:' + configServe.port })
	],

	resolve: {
		extensions: ['', '.js', '.jsx']
	},

	stats: {
		colors: true
	},

	devtool: 'source-map'
};
