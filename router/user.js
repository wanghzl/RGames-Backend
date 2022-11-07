const express = require('express')
const router = express.Router()
//引入路由的处理函数
const user_handler = require('../router_handler/user')

//引入表单数据验证的中间件
const expressJoi = require('@escook/express-joi')
//导入表单数据验证的规则对象
const { reg_user_schema } = require('../schema/user')

//注册新用户    expressJoi(reg_user_schema),
router.post('/reguser', expressJoi(reg_user_schema), user_handler.regUser)

//登录
router.post('/login', expressJoi(reg_user_schema), user_handler.login)
//发送验证码
router.post('/sendcode', user_handler.sendCode)


module.exports = router;