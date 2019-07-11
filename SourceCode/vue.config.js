module.exports = {
    devServer: {
        // 跨域代理
        proxy: {
            '/api': {
                //target: 'http://47.100.236.223:1211/',
                // target: 'http://zonghang.xyz/',
                target: 'http://110.64.72.160:8080',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    },
    // 基本路径
    publicPath: './',
}
