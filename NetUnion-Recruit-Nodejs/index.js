/* basic */
const path = require('path')
const nodemaiiler = require('nodemailer')

/* 引入express框架 */
const express = require('express');
const app = express();

/* 引入multiparty框架 */
var multiparty = require('multiparty');
 
/* 引入cors */
const cors = require('cors');
app.use(cors());
 
/* 引入body-parser */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
/* 在此处修改MySQL设置 */
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: '*',
    password: '*',
    database: '*',
    multipleStatements: true,
});
connection.connect();

//从数据库读取当前已有报名信息
connection.query('SELECT * FROM info', function(err, rows) {
    if (err) console.log('与MySQL数据库建立连接失败。');
    console.log("已报名信息 ==> ");
    for (var i in rows) {
        console.log(rows[i]);
    }
});

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    next();
 });

//查询报名情况的API
app.post("/api/infoQuery",(req,res) => {
    let form = new multiparty.Form();
    form.parse(req, function(err,fields,file){
        console.log(fields);
        let stdnumberQuery = fields.stdnumber;

        connection.query("SELECT * FROM info WHERE uid=?",[stdnumberQuery],function(err, result) {
            if (err) console.log('与MySQL数据库建立连接失败。');
            console.log("查询到相关信息 ==>");
            console.log(result);
            console.log("#################");

            //默认取该学号的第一次提交结果
            let data = result[0];
            var Address = '/info-query.html/result/'+stdnumberQuery;

            if (data == undefined){
                console.log('未报名。');
                app.get(Address, function(req,res){
                    res.send("该学号未报名！");
                })
            }
            else {
                //该学号已报名
                app.get(Address, function(req,res){
                    res.send(data);
                })
                /*let name = data.name;
                let sex = data.sex;
                let nickname = data.nickname;
                let stdnumber = data.uid;
                let emailAddress = data.emailAddress;
                let phonenumber = data.phonenumber;
                let department = data.department;
                let introduction = data.introduction;*/
            }
        });
    })
})


//发送邮件的API
app.post("/api/sendMail",(req,res) => {
    let form = new multiparty.Form();
    form.parse(req, function(err,fields,file){
        //将获取的表单数据保存
        console.log(fields);
        let describe = fields.describe;
        let name = fields.name;
        let sex = fields.sex;
        let nickname = fields.nickname;
        let stdnumber = fields.stdnumber;
        let emailAddress = fields.emailAddress;
        let phonenumber = fields.phonenumber;
        let department = fields.department;
        let introduction = fields.introduction;

        //在此处修改发件邮箱设置
        const config = {
            //默认为qq邮箱
            host: 'smtp.qq.com',
            auth: {
                //发件人邮箱
                user: '*', 
                //邮箱授权码
                pass: '*'  
            }
        }
    
        const transporter = nodemaiiler.createTransport(config)
        
        //在此处修改邮件具体内容
        let mail = {
            //发件人
            from: '*',
            //收件邮箱
            to: '*',
            //title
            subject: "2019招新-"+department+"-"+name+":"+stdnumber,
            //正文
            text: describe+" 的 "+name+", "+sex+"\n.意向部门是: "+department+"\n也可以叫我: "+nickname+"\n电子邮箱: "+emailAddress+"\n手机号码: "+phonenumber+"\nAbout me: "+introduction,
        }
    
        transporter.sendMail(mail, function(err, info){
            if(err) {
                return console.log(err);
            }
            transporter.close()
            console.log('mail send:', info.response)
        })

        //将报名信息存储到数据库中
        var infoAdd = 'INSERT INTO info(name,sex,nickname,email,intention,intro,uid,phone) VALUES(?,?,?,?,?,?,?,?)';
        var infoAddData = [fields.name,fields.sex,fields.nickname,fields.emailAddress,fields.department,fields.introduction,fields.stdnumber,fields.phonenumber];

        connection.query(infoAdd,infoAddData,function(err, result) {
            if (err) console.log('向数据库中添加报名信息失败。');
            console.log("Congradulations ==> ");
            console.log(result); 
        });
    });
})


//监听端口，默认为8080 & 调用public文件下的静态页面
app.use(express.static(path.join(__dirname, 'public')));
app.listen(8080, () => {
    console.log('Now you can visit 127.0.0.1:8080');
})