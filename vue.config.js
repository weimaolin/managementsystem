const webpack = require('webpack')
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
    // baseUrl: '/', //根路径
    outputDir: 'dist', //构建输出目录(打包)
    assetsDir: 'assets', //静态资源输出目录
    lintOnSave: false, //是否开启eslint保存检测，有效 true||false||'error
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    },

    devServer: {
        // open: true,
        // host: 'localhost',
        // port: 8080,
        // https: false,
        // hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://localhost:8787',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    }


}