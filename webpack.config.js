require("babel-polyfill");
const path = require('path');
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const htmlWebpackPlugin = new HtmlWebpackPlugin({
//     template: path.join(__dirname, "src/index.html"),
//     filename: "./index.html"
// });


module.exports = {
    entry: ["babel-polyfill", path.resolve(__dirname, 'src', 'index.jsx')],
    output: {
        path: path.resolve(__dirname, 'output'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'env'],
                        plugins: ["transform-class-properties"]
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    // plugins: [htmlWebpackPlugin, new webpack.DefinePlugin({
    //     'process.env': { 'NODE_ENV': JSON.stringify('production') }
    // })],
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer: {
        contentBase: './src',
        publicPath: '/output',
        historyApiFallback: true
    },
    mode: "development"
};