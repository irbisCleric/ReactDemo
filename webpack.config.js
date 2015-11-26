var path = require('path');
module.exports = {
    entry: './app/scripts/index.jsx',
    output: {
        path: __dirname,
        filename: "./build/bundle.js"
    },
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
