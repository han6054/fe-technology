class copyRightWebpackPlugins {
    constructor() {}
    apply(compiler){
        compiler.hooks.emit.tapAsync('copyRightWebpackPlugins',
            (compliation, cb) => {
                compliation.assets['test.txt'] = {
                source: () => {
                    return 'hello txt'
                },
                size: () => {
                    return 1024
                }
            };
            cb()
        })
    }
}

module.exports = copyRightWebpackPlugins;