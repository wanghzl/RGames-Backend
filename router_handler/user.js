//引入数据库的配置
const db = require('../db')
//引入数据加密的库
const bcrypt = require('bcryptjs')
//引入生成token的库
const jwt = require('jsonwebtoken')
//引入发送邮箱验证码的方法
const { sendEmail } = require('../util')

//定义验证码列表
let codes = {}



//注册用户的处理函数
exports.regUser = (req, res) => {
    let { username, password, email, code } = req.body
    console.log(req.body)
    //检验用户名是否重复
    let sql = 'select * from users where username=?'
    db.query(sql, username, (err, results) => {
        //当sql语句执行失败时 
        if (err) return res.cc(err)
        //当数据库中已有重复的用户名时
        if (results.length > 0) return res.cc('该名称已被占用，请更改用户名')
        console.log(email, codes[email])
        //当验证码错误时
        if (!codes[email] || code != codes[email]) return res.cc('验证码错误！')

        //无任何特殊情况，可以正常注册
        //对密码进行加密处理 hashSync(明文密码，随机盐的长度)
        password = bcrypt.hashSync(password, 10)
        let sql = 'insert into users set ?'
        db.query(sql, { username, password }, (err, results) => {
            if (err) return res.cc(err)
            //判断是否添加成功（判断影响行数是否为1）
            if (results.affectedRows != 1) return res.cc('注册失败，请稍后重试')
            res.cc('注册成功', 0)
        })
    })
}

//用户登录的处理函数
exports.login = (req, res) => {
    let { username, password } = req.body;
    let sql = 'select * from users where username=?'
    db.query(sql, username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length != 1) return res.cc('未找到该用户名，登录失败！')
        //把密码明文与密文进行对比，查看用户密码输入是否正确
        if (!bcrypt.compareSync(password, results[0].password)) return res.cc('密码错误')
        //剔除掉要生成token字符串的对象的用户密码和头像
        let user = { ...results[0], password: '', user_pic: '' }
        //生成token字符串sign(生成对象，秘钥，配置项)
        let token = jwt.sign(user, require('../config').key, { expiresIn: '72h' })
        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + token
        })
    })

}

//发送验证码
exports.sendCode = (req, res) => {
    let { email } = req.body
    let code = Math.random().toString().slice(3, 9)
    codes[email] = code
    setTimeout(() => {
        delete codes[email]
    }, 1000 * 60 * 10)


    console.log(codes)
    req.cc('成功', 0)


    // sendEmail(email, code, res)
}