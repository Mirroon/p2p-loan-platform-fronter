module.exports = {
    devServer: {
        // 跨域代理
        proxy: {
            '/sell': {
                //target: 'http://47.100.236.223:1211/',
                target: 'http://zonghang.xyz/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': 'sell'
                }
            },
        }
    },
    // 基本路径
    publicPath: './',
}
