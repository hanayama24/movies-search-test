const path = require('path');
const packageJson = require('../package.json');
const constants = require('./shared/constants');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
	context: process.cwd(),
	entry: path.join(constants.srcPath, 'app_loader.ts'),
	output: {
		path: constants.dstPath,
		filename: 'index.js',
		chunkFilename: 'js/[name].[contenthash].js',
		jsonpFunction: 'jsonpPersonalGroupListing'
	},
	target: 'web',
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
		mainFields: ['module', 'browser', 'main'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: "ts-loader",
						options: {
							transpileOnly: true,
							experimentalWatchApi: true,
						}
					}
				],
				include: constants.srcPath,
        		exclude: /node_modules/
			},
			// static assets
			{ test: /\.html$/, use: 'html-loader' },
            {
                test: /\.(a?png|svg|jpe?g|gif|bmp)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: '[name].[hash:8].[ext]',
                        outputPath: 'static/images',
                    }
                }
            },
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				use: {
					loader: 'file-loader',
					options: {
							name: '[name].[hash:8].[ext]',
							outputPath: 'static/fonts',
					},
				}
			}
		]
    },
	plugins: [
		new ForkTsCheckerWebpackPlugin({
			memoryLimit: 4096,
			tslint: true,
			checkSyntacticErrors: true,
			useTypescriptIncrementalApi: true,
		}),

		new HtmlWebpackPlugin({
			template: path.join(constants.srcPath, 'assets', 'index.html'),
			title: packageJson.name,
		}),

		new StyleLintPlugin({
			configFile: path.join(process.cwd(), '.stylelintrc'),
			context: constants.srcPath,
			files: '**/*.css',
			failOnError: false,
			quiet: false,
		}),

	],
};
