const express = require('express')
const app = express()

const { expressjwt } = require('express-jwt')

//配置解决跨域的中间件
app.use(require('cors')())
//配置解决表单数据的中间件 ,只能解析application /x-www-form-urlencoded格式的数据
app.use(express.urlencoded({ extended: false }))
//配置解决表单数据的中间件 ,只能解析json格式的数据
app.use(require('body-parser').json())


//封装一个响应数据的中间件
app.use((req, res, next) => {
    //status为状态码，0：为成功，1：为失败 ，方便前端处理失败的情况
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next();
})

//配置解析token中间件
app.use(expressjwt({
    secret: require('./config').key,     //秘钥
    algorithms: ['HS256'],                  //新版的库必须加上这个
}).unless({
    path: [/^\/api\//]                  //指定哪些接口不需要token验证
}))


//导入用户模块路由
app.use('/api', require('./router/user'))











//配置错误级中间件
app.use((err, req, res, next) => {
    if (err.name == 'UnauthorizedError') return res.cc('认证失败，请重新登录！')
    if (err) return res.cc(err)

})
app.listen(80, () => {
    console.log('服务已启动，地址http://localhost')
})