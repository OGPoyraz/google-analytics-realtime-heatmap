/**
 * Created by OGPoyraz on 22/07/16.
 */

var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: [
        './src/app'
    ],
    output: {
        path: './dist',
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader", query:{presets: ['es2015', 'react', 'react-hmre']}},
            {test: /(\.css|\.scss)$/, loaders: ['style', 'css?sourceMap', 'sass?sourceMap']},
        ]
    },
    devServer: {
        inline:true,
        host: '0.0.0.0',
        port: 3001
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        })
        //new webpack.DefinePlugin({
        //    'process.env': {
        //        'NODE_ENV': JSON.stringify('production')
        //    }
        //})
    ],
    externals: {
    }
};
