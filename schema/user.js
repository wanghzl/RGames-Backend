const joi = require('joi')

/**
 * joi验证规则
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

exports.reg_user_schema = {
    body: {
        username: joi.string().min(2).max(7).required(),
        password: joi.string().required().pattern(/^[\S]{6,12}$/),
        email: joi.string().pattern(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/),
        code: joi.string()
    }

}