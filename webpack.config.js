var webpack       = require('webpack');
var merge         = require('webpack-merge');
var autoprefixer  = require('autoprefixer');
var BundleTracker = require('webpack-bundle-tracker');
var path = require('path');

var TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

var target = __dirname + '/wiki/static/wiki/bundles';

var postCSSPlugins = function() {
	return {
		defaults: [autoprefixer],
		cleaner: [autoprefixer({ browsers: [
			'Chrome >= 35',
			'Firefox >= 31',
			'Edge >= 12',
			'Explorer >= 9',
			'iOS >= 8',
			'Safari >= 8',
			'Android 2.3',
			'Android >= 4',
			'Opera >= 12'
		]})]
	}
}

var main = {
	entry: {
		main: path.resolve(__dirname, 'client/main.jsx'),
	},

	output: {
		path: target,
		filename: '[name].js'
	},

	resolve: {
		alias: { '~': path.resolve(__dirname, 'client/') },
		extensions: ['.js', '.jsx', '.scss', '.sass'],
		modules: ['node_modules']
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: [
					{
						loader: 'babel-loader',
						query: {
							presets: ['react', 'env'],
							plugins: ['add-module-exports']
						},
					}
				],
				include: [
					path.resolve(__dirname, 'client/'),
				],
			},
			{
				test: /\.s[ca]ss$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: postCSSPlugins
						}
					},
					{
						loader: 'sass-loader',
						options: {
							includePaths: [path.join(__dirname, 'node_modules')]
						}
					}
				],
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: postCSSPlugins
						}
					}
				]
			}
		]
	},

	plugins: [
		new BundleTracker({
			path: target,
			filename: './webpack-stats.json'
		})
	]
};

if (TARGET === 'build') {
	module.exports = merge(main, {
		output: {
			filename: '[name]-[hash].js'
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': { 'NODE_ENV': JSON.stringify('production') }
			})
		]
	});
}

if (TARGET === 'start') {
	module.exports = merge(main, {
		devtool: 'eval-source-map',
		devServer: {
			contentBase: target,
			progress: true,
		}
	});
}
