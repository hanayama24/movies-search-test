const path = require('path');
const webpack = require('webpack');

const constants = require('./shared/constants');
const postCssLoader = require('./shared/postCssLoader');
const env = require('./shared/env');

const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    devtool: "source-map",
    optimization: {
		minimizer: [
			new TerserPlugin({
				cache: true,
				parallel: true,
				sourceMap: true,
				terserOptions: {
					ecma: 5,
				},
			}),
			new OptimizeCSSAssetsPlugin({})
		],
      },
    module: {
        rules: [
            {
				test: /\.module\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: path.join(constants.dstPath, 'css'),
						},
					},
					{
                        loader: 'css-loader',
						options: {
                              modules: true,
                              importLoaders: 1,
                        }
                    },
					postCssLoader,
				]
			},
			{
                test: /\.css$/,
                exclude: /\.module\.css/,
				use: [
                    {
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: path.join(constants.dstPath, 'css'),
						},
					},
                    'css-loader',
					postCssLoader,
				]
			}
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash].css',
			chunkFilename: 'css/[name].[contenthash].css',
		}),
		new webpack.DefinePlugin(env('production')),
		new CleanWebpackPlugin(),
    ]
};
