const path    = require("path");
const express = require("express");
const app     = express();

const DIST_DIR = path.join(__dirname, "src");
const PORT = 3000;

//Serving the files on the dist folder
app.use(express.static(DIST_DIR));

//Send index.html when the user access the web
app.get("*", function (req, res) {
    res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.listen(PORT, () => {console.log(`Listening on port ${PORT}...`)});


// const webpack = require('webpack');
// const webpackMiddeleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');
// const webpackConfig = require('./webpack.config');
// const compiler = webpack(webpackConfig);
// const path     = require("path");
// const express  = require("express");
// const app      = express();

// const DIST_DIR = path.join(__dirname, "src");
// const PORT = 3000;

// app.use(express.static(DIST_DIR));
// app.use(webpackMiddeleware(compiler, {
//     hot: true,
//     publicPath: webpackConfig.output.publicPath,
//     noInfo: true
// }));
// app.use(webpackHotMiddleware(compiler));

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, './index.html'));
// });
// app.listen(PORT, () => {console.log(`Listening on port ${PORT}...`)});


