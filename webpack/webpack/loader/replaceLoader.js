const loaderUtils = require('loader-utils')

module.exports = function (source) {
    // const options = this.query;
    const options = loaderUtils.getOptions(this);
    const callback = this.async()
    setTimeout(() => {
        const ret = source.replace('hello', options.name)
        callback(null, ret)
    })
    // return source.replace('hello', options.name)

}