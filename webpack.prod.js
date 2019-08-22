const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TeserPlugin = require('terser-webpack-plugin');

const config = merge.strategy({
    'entry.pdl-fullmakt-ui': 'prepend',
    'module.rules': 'append',
    optimization: 'append',
})(common, {
    mode: 'production',
    entry: {
        'pdl-fullmakt-ui': ['babel-polyfill', 'url-search-params-polyfill'],
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        },
                    },
                    { loader: 'postcss-loader' },
                    {
                        loader: 'less-loader',
                        options: {
                            globalVars: {
                                coreModulePath: '"~"',
                                nodeModulesPath: '"~"',
                            },
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        minimizer: [
            new TeserPlugin({
                sourceMap: true,
            }),
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'pdl-fullmakt-ui.css',
            allChunks: true,
        }),
    ],
});

module.exports = config;
