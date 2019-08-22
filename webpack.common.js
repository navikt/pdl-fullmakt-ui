const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TypeScriptTypeChecker = require('fork-ts-checker-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = {
    entry: {
        'pdl-fullmakt-ui': ['./src/index.tsx'],
    },
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'tslint-loader',
                enforce: 'pre',
            },
            {
                test: /\.(js|ts|tsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true,
                },
            },
            {
                test: /\.svg$/,
                loader: 'url-loader',
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            inject: 'body',
            alwaysWriteToDisk: true,
        }),
        new TypeScriptTypeChecker(),
        new webpack.NoEmitOnErrorsPlugin(),
        new OptimizeCssAssetsPlugin(),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /nb|nn|en/),
    ],
};

module.exports = config;
