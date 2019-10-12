# NetUnion招新页面-Demo

## 本地环境配置

[Nodejs](http://nodejs.cn/)

[mysql 5.7.27](https://dev.mysql.com/downloads/windows/installer/5.7.html)

## 本地查看网页

**Chrome is recommended.**

+ 不调用发邮件和查询报名信息的功能，仅查看网页

直接打开根目录下public文件夹中的index.html

+ 使用全部功能

打开根目录下的文件index.js，对mysql进行设置。根据实际使用情况修改下方带\*号的配置：
    
    const conn = mysql.createConnection({
        host: 'localhost',
        user: '\*MySQL用户',
        password: '\*密码',
        database: '\*数据库名',
        multipleStatements: true
    })


对sendmailer接口进行编辑。根据实际使用情况修改下方带\*号的配置：
    
    const config = {
        //默认为qq邮箱
        host: 'smtp.qq.com',
        auth: {
            //发件人邮箱
            user: '\*', 
            //邮箱授权码
            pass: '\*'  
        }
    }

    let mail = {
        //发件人
        from: '\*',
        //收件邮箱
        to: '\*',
        //title
        subject: "2019招新-"+department+"-"+name+":"+stdnumber,
        //正文
        text: describe+" 的 "+name+", "+sex+"\n.意向部门是: "+department+"\n也可以叫我: "+nickname+"\n电子邮箱: "+emailAddress+"\n手机号码: "+phonenumber+"\nAbout me: "+introduction,
    }

cmd移动到项目根目录，输入命令

> node index.js

此时即可使用浏览器访问本地服务器

> http://127.0.0.1:8080

或者访问
> http://localhost:8080

