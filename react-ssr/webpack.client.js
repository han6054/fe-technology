let path = require('path');

module.exports =  {
    target: 'node',
    mode: 'development',
    entry: './client/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-env'],
                }
            }
        ]
    }
}