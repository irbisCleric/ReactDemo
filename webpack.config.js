var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080/', // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        './app/scripts/index.js' // Your appʼs entry point
    ],
    output: {
        path: __dirname,
        filename: "./build/bundle.js"
    },
    plugins: [
        new OpenBrowserPlugin({url: 'http://localhost:8080'}),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ],
    module: {
        loaders: [
            // JS
            {
                test: /\.js?$/,
                loader: 'babel?optional=runtime',
                exclude: /node_modules/
            },
            // SASS
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },

            // CSS
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                // HTML LOADER
                // Reference: https://github.com/webpack/raw-loader
                // Allow loading html through js
                test: /\.html$/,
                loader: 'raw'
            },
            // ICON FONTS
            {
                test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js']
    }
};
