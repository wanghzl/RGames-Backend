//导入发送邮件库
const nodeMailer = require('nodemailer');
//第一步：创建一个邮件发送器
// 语法：const 变量名 = nodeMailer.createTransport({配置信息});
const transporter = nodeMailer.createTransport({
    // host:'',//表示域名
    // port:'',//表示端口号
    // secure:false,//表示源
    // //上面这三个配置项目不能随便书写。要按照要求书写
    /*
    打开node_modules=>找到nodemailer文件夹=>找到lib文件夹=>找到well-know
    找到services.json文件
    */
    host: 'smtp.qq.com',
    port: 465,
    secure: true,
    auth: {
        user: '1254772343@qq.com',//这个表示的发送方的邮箱
        pass: 'iidhwopdbnnuighb',//表示授权码.授权码获取方式在后面
    }
});

//暴露发送邮件的方法
module.exports.sendEmail = (mail, code, res) => {

    //第二步：开始发送邮件。语法：transporter.sendMail({配置项},回调函数);
    transporter.sendMail({
        from: '1254772343@qq.com',//是从哪里发送出去(填发送方的邮箱地址)
        to: [
            mail  //发送给谁(填接收方的邮件地址)
        ],
        subject: '邀请函',   //邮件的标题
        // text:'hello',//文本的内容
        html: `
        <h3>尊敬的用户，欢迎您使用RGames，您的验证码为：<h1 style='
            color:white;
            font-size:1.5em;
            background:black;
            display:inline-block;
            padding:0 1em;'>${code}</h1>
            ,验证码10分钟内有效，如非您本人操作，请忽略。
        </h3>
    `,           //这个是超文本的内容。使用模板字符串
        //注意：文本内容和超文本内容只能使用一个
    },
        function (err, info) {
            if (err) return res.cc('验证码发送失败，请稍后再试')
            //代码执行到这里，说明发送成功
            res.cc('验证码发送成功', 0)
        }
    );

}
