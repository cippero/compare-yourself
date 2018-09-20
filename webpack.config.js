require("babel-polyfill");
const path = require('path');

module.exports = {
    // Example setup for your project:
    // The entry module that requires or imports the rest of your project.
    // Must start with `./`!
    entry: ["babel-polyfill", path.resolve(__dirname, 'src', 'index.js')],
    // Place output files in `./dist/my-app.js`
    output: {
        path: __dirname + '/dist',
        filename: 'my-app.js'
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
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
    devServer: {
        contentBase: './src',
        publicPath: '/dist'
    },
    mode: "development"
};