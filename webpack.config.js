var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var webpack = require('webpack')
module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080/', // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        './app/scripts/index.jsx' // Your appʼs entry point
    ],
    output: {
        path: __dirname,
        filename: "./build/bundle.js"
    },
    plugins: [
        new OpenBrowserPlugin({url: 'http://localhost:8080'}),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
    ],
    module: {
        loaders: [
            // JSX
            {
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel'],
                exclude: /node_modules/
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
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

            // ICON FONTS
            {
                test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    alias: {
        react: path.resolve('./node_modules/react')
    }
};
