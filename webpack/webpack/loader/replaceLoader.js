module.exports = function (source) {
    const options = this.query;
    return source.replace('hello', options.name)
}