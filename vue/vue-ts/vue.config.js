const path = require('path')
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? 'hjj.com'
        : 'test-hjj.com',
    outputDir: path.resolve(__dirname + '/dist/hjjWork')
}