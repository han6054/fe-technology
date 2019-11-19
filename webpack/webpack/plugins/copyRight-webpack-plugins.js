class copyRightWebpackPlugins {
    constructor() {}
    apply(compiler){
        compiler.plugin('emit',
            (compliation, cb) => {
                compliation.assets['test.txt'] = {
                source: () => {
                    return 'hello hjj txt'
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