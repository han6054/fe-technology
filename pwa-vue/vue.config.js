const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
const path = require('path')
module.exports ={
    configureWebpack: {
        plugins: [
            new SkeletonWebpackPlugin({
                webpackConfig: {
                    entry: {
                        app: path.resolve(__dirname,'src/skeleton.js')
                    }
                },
                router: {
                    mode: 'history',
                    routes: [
                        {
                            path: '/',
                            skeletonId: 'skeleton1'
                        },
                        {
                            path: '/about',
                            skeletonId: 'skeleton2'
                        }
                    ]
                }
            })
        ]
    }
}
