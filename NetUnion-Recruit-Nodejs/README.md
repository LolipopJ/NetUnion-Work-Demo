# NetUnion招新页面-Demo

## 本地环境配置

[Nodejs](http://nodejs.cn/)

依赖文件见package.json，使用node进行下载即可。

[mysql 5.7.27](https://dev.mysql.com/downloads/windows/installer/5.7.html)

## 本地查看网页

**Chrome is always recommended.**

### 不调用发邮件和查询报名信息的功能，仅查看网页

直接打开根目录下public文件夹中的index.html

### 使用全部功能

1. 建立数据库，其中表名设置为'info'，表中元素应包括[name,sex,nickname,email,intention,intro,uid,phone]以及自增关键字[id]：

        CREATE DATABASE 数据库名 CHARACTER SET utf8;

        USE 数据库名;

        CREATE TABLE info (
            id int(4) auto_increment key,
            name varchar(16) not null,
            sex char(4) not null,
            nickname varchar(16) not null,
            email varchar(40) not null,
            intention char(10) not null,
            intro varchar(300) not null,
            uid char(13) not null,
            phone char(11) not null
        );

2. 打开根目录下的文件index.js，对mysql进行设置。根据实际使用情况修改下方带\*号的配置：

        const conn = mysql.createConnection({
            host: 'localhost',
            //MySQL用户名
            user: '*',
            //密码
            password: '*',
            //数据库名
            database: '*',
            multipleStatements: true
        })

3. 对sendmailer接口进行编辑。根据实际使用情况修改下方带\*号的配置：

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

4. cmd移动到项目根目录，输入命令

    > node index.js

    此时即可使用浏览器访问本地服务器

    > http://127.0.0.1:8080

    或者访问

    > http://localhost:8080

## 关于

### Nodejs+JavaScript：实现前后端串联

1. 引入express框架，渲染静态页面。访问监听的本地窗口时进入到index页面。

2. 通过ajax方法，将前端表单填写的报名信息内容传递给服务器端。调用nodemailer模块实现邮件的发送。

3. 通过ajax方法，将前端填写的学号信息传递给后端，调用mysql模块，对数据库内容进行检索。最后将结果返回前端页面。

## 亟待更新

### 重要

+ **页面设计**

    about, info-query, recruit页面还未进行页面设计美化。

+ **动态刷新内容**

    实现查询数据库后动态刷新info-query页面，而不是跳转到新的空白页面显示结果。

### 不重要

+ **侧边栏**

    优化侧边栏的动画效果。

+ **页面交互**

    优化普通页面的交互动画。
