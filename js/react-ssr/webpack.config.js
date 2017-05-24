/*global __dirname*/
const
    CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    path = require('path');


let common = {
    
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    plugins: ['transform-runtime'],
                }
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract([{
                    loader: 'css-loader',
                    options: {minimize: true}
                }, 'stylus-loader?resolve url'])
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(['css-loader'])
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    },
    plugins: [
        new CommonsChunkPlugin({
            name: 'common',
            minChunks: 2
        }),
        new ExtractTextPlugin('[name].css'),
    ]
};

let frontEnd = Object.assign({}, common, {
    name: 'front',
    context: path.join(__dirname, 'src', 'app'),
    entry: {
        index: ['./index']
    },
    output: {
        path: path.join(__dirname, 'public', 'build'),
        publicPath: '/build/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.styl', '.js', '.css']
    }
    
});

// Return Array of Configurations
module.exports = [frontEnd];