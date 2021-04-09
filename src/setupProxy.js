// 引入中间件模块
const proxy = require('http-proxy-middleware')

// 请求路径为何种，使用某个代理，
module.exports = function (app) {
    app.use(
        proxy('/api', {
            target: 'http://localhost:5000',
            changeOrigin: true, // 为真，伪装为请求服务器的host，为假者host字段还是为当前服务器
            pathRewrite: {'^/api': ''} // 请求路径重写
        })
    )
}
