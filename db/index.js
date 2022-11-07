const mysql = require('mysql')

//配置数据库
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'relaxed_games'
})
module.exports = db