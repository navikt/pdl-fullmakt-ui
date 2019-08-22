const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const config = merge.strategy({
    'entry.pdl-fullmakt-ui': 'prepend',
    'module.rules': 'append',
})(common, {
    mode: 'development',
    entry: {
        'pdl-fullmakt-ui': [
            'babel-polyfill',
            'url-search-params-polyfill',
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?reload=true',
        ],
    },
    output: {
        filename: '[name].[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
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
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
});

module.exports = config;
