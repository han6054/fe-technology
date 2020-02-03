let path = require('path')
module.exports = {
    entry: './index.js', 
    devtool: 'source-map',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    }
}