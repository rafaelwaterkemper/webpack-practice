var path = require('path');

let SERVICE_URL = JSON.stringify('http://localhost:3000');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');

module.exports = {
    entry: './app-src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/](jquery|bootstrap)[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            // publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader?limit=10000&mimetype=application/font-woff'
                }
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
                }
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'file-loader'
                }
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false // Enable to remove warnings about conflicting order
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\main\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'index.html',
            template: './index.html',
            minify: {
                html5: true,
                removeComments: true
            }
        }),
        new webpack.ProvidePlugin({
            '$': 'jquery/dist/jquery.js',
            'jQuery': 'jquery/dist/jquery.js'
       }),
       new webpack.DefinePlugin({
           SERVICE_URL
       })
    ]
}