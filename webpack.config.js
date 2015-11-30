var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

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
        new OpenBrowserPlugin({url: 'http://localhost:8080'})
        //new ExtractTextPlugin("[name].css")
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
            }
        ]
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
