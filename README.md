# 2019-电子科技大学-NetUnion前端招新任务

## 实现一个在线报名的网页

**[NetUnion-Recruit-Nodejs](https://github.com/JasonSun2018/NetUnion-Work-Demo/tree/master/NetUnion-Recruit-Nodejs)**

### 题目内容

    经历了报名的你，是否觉得填写报名表很麻烦？要完成一次报名，需要打开电脑用 Word 打开报名表，一个个填入信息。还要按照格式要求把报名表作为附件发送到报名邮箱里。而收到报名的人，看到大量不符合要求的邮件也难以处理。如果有一个填写报名信息的网站就好了，不仅可以在手机上填写信息，而且轻松就可以把报名表提交上去。那么请你开发一个网站来解决上面的问题。

### 功能要求

+ 一个前端页面和一个用 JavaScript 写的后端程序。

+ 前端为一个表单输入报名信息，报名信息应至少包含姓名，邮箱和报名方向。

+ 前端部分应包含网管会的介绍。

+ 前端表单应实现一定的验证功能。

+ 后端接收到前端发送的请求后发送包含报名信息的邮件给管理员。

+ 实现报名状态的查询：通过学号查询是否已经报名。

+ 实现在线查看报名信息。

+ 良好的UI。

---

## 实现一个简单的终端模拟器

### 功能要求

+ 历史记录支持。

  + 将历史记录保存到LocalStorage；

  + 按键盘⬆或⬇可以查询上一条历史记录和下一条历史记录。

+ 模拟clear命令。

+ 根据历史记录做到Tab命令自动补全。

+ 良好的UI。

+ 分屏等更多功能。(未实现)

### 接口文档

#### API功能

执行 shell 命令

#### API调用

##### 请求信息

协议: `HTTPS`
地址: `https://shell.recruit.netunion.ondev.cn/run`
方法: `GET`

##### 请求参数

名称: `cmd`
位置: `QUERY`
类型: `STRING`
必填: `是`

##### 返回信息

返回参数位置: `BODY`
返回参数类型: `STRING`

##### 错误码

    400: 请求格式错误
    504: 请求超时（可能是因为命令执行时间过长）

##### API使用示例

实例功能：执行 `echo "Hello, world!"` 命令

    $ curl https://shell.recruit.netunion.ondev.cn/run\?
    cmd\=echo%20%22Hello%2C%20world\!%22
    > GET /run?cmd=echo%20%22Hello%2C%20world!%22 HTTP/2
    > Host: shell.recruit.netunion.ondev.cn
    > Accept: */*
    >
    * Connection state changed (MAX_CONCURRENT_STREAMS == 128)!
    < HTTP/2 200
    < content-type: text/plain
    <
    Hello, world!
    * Connection #0 to host shell.recruit.netunion.ondev.cn left intact
