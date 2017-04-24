/**
 * Created by icokie on 08.04.17.
 */
/* global __dirname */
var path = require('path');

module.exports = {
    context: path.join(__dirname, 'dev'),
    entry: {
        cacheBox: './cacheBox',
        test: '../tests/indexTest'
    },

    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '/',
        filename: '[name].js'
    },

    module : {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-0'],
                        plugins: ['transform-runtime'],
                        cacheDirectory: true
                    }
                }
            }
        ]

    },

};
