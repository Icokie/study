/* global __dirname */

module.exports = {
    context: __dirname + '/dev/',
    entry: {
        index: './index.js'
    },
    output: {
        path: __dirname + '/build/',
        filename: '[name].js'
    },
    
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }
        ]
    }
    
};