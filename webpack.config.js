var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: './app/scripts/index.jsx',
    output: {
        path: __dirname,
        filename: "./build/bundle.js"
    },
    plugins: [
        new OpenBrowserPlugin({ url: 'http://localhost:8080' })
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel'],
            exclude: /node_modules/
        }, {
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    externals: {
        //don't bundle the 'react' npm package with our bundle.js
        //but get it from a global 'React' variable
        'react': 'React'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
