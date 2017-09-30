const path = require('path')

module.exports = {
    context: path.resolve(__dirname, '../src'),
    entry: ['./index'],

    output: {
        path: path.resolve(__dirname, '../public/build'),
        filename: './[name].js',
        publicPath: '/build'
    },

    module:{
        rules:[
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use:['babel-loader']
            }
        ]
    }
}
