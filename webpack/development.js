const webpack = require('webpack');
const postCssLoader = require('./shared/postCssLoader');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const env = require('./shared/env');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    optimization: {
        namedModules: true,
        // removeAvailableModules: false,
        // removeEmptyChunks: false,
        // splitChunks: false,
    },
	devServer: {
        contentBase: './public',
        port: 3001,
		hot: true,
		inline: true,
		historyApiFallback: {
			disableDotRule: true
		},
		stats: 'minimal',
		clientLogLevel: 'warning'
    },
    module: {
        rules: [
            {
				test: /\.module\.css$/,
				use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
						options: {
                              modules: true,
                              importLoaders: 1,
                              sourceMap: true,
                              localIdentName: '[local]_[hash:base64:5]',
                        }
                    },
					postCssLoader,
				]
			},
            {
                test: /\.css$/,
                exclude: /\.module\.css/,
				use: [
                    'style-loader',
                    'css-loader',
					postCssLoader,
				]
			}
        ],
    },
    plugins: [
        new ErrorOverlayPlugin(),
        new webpack.DefinePlugin(env('development')),
    ]
}
