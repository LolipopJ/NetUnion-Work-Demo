//查询报名信息
$(function(){
    $("#queryBtn").bind("click", function(){
        let data = $("#query").serializeArray();
        let uid = data[0].value;
        //调用后端API:infoQuery
        let form = document.getElementById("query");
        let formData = new FormData(form);

        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8080/api/infoQuery",
            data: formData,
            processData: false,
            contentType: false,
            success:function(result){
                console.log(result);
            },
            error:function(err){
                console.log(err);
                alert("错误：请稍后重试！");
                return false;
            }
        })

        //跳转页面
        resultPage='info-query.html/result/'+uid;
        location.href=resultPage;
    })
})

//发送邮件
$(function(){
    $("#sendmail").bind("click", function(){
        //获取表单数据
        let uncheckedData = $("#recruition").serializeArray();
        let describe = uncheckedData[0].value;
        let name = uncheckedData[1].value;
        let sex = uncheckedData[2].value;
        let nickname = uncheckedData[3].value;
        let stdnumber = uncheckedData[4].value;
        let emailAddress = uncheckedData[5].value;
        let phonenumber = uncheckedData[6].value;
        let department = uncheckedData[7].value;
        let introduction = uncheckedData[8].value;

        //检查表单
        //必要信息输入完全
        if(!(name=="杰哥"||name=="姓名"||nickname=="不要啊"||stdnumber=="2018091601000"||stdnumber=="学号"||emailAddress=="2231456@foxmail.com"||emailAddress=="邮箱地址"||phonenumber=="189********"||phonenumber=="手机号码")){
            //校验邮箱格式
            if(emailAddress.indexOf("@") == -1){
                alert("请确认邮箱格式正确！");
                return false;
            }

            //校验手机号码格式
            if(phonenumber.length != 11){
                alert("请确认手机格式正确！");
                return false;
            }

            //招新标准 & 防止恶意邮件
            if(!(stdnumber.slice(0,4)=="2018"||stdnumber.slice(0,4)=="2019")){
                alert("本页面招新只面向2018级和2019级的电子科技大学本科生开放！");
                return false;
            }
        }
        else{
            alert("请确认信息输入完全！");
            return false;
        }

        //调用后端API:sendMail
        const form = document.getElementById("recruition");
        let formData = new FormData(form);
        
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8080/api/sendMail",
            data: formData,
            processData: false,
            contentType: false,
            success:function(result){
                console.log(result);
            },
            error:function(err){
                console.log(err);
                alert("错误：邮件发送失败！");
                return false;
            }
        })

        alert("报名成功！期待您带来的精彩！");
        //跳转页面
        location.href='thanks.html';
    })
})

//button & bg & intro animation
document.writeln("<script>");
document.writeln("                $(document).ready(function(){");
document.writeln("                    $(\'.cover #btnS\').click(function(){");
document.writeln("                        $(this).fadeOut(500);");
document.writeln("                        $(\'.cover #typedWords\').fadeOut(1000);");
document.writeln("                        $(\'#background\').fadeOut(500,function(){$(this).css(\'background-image\',\'url(images/coder.jpg)\')}).fadeIn(1500);");
document.writeln("                        $(\'#intro\').fadeIn(2500);");
document.writeln("                        setTimeout(function(){$(\'.cover #btnN\').fadeIn(500)},3000);");
document.writeln("                    });");
document.writeln("                });");
document.writeln("                $(document).ready(function(){");
document.writeln("                    $(\'.cover #btnN\').click(function(){");
document.writeln("                        $(this).fadeOut(500);");
document.writeln("                        $(\'#intro\').fadeOut(1000,function(){$(this).text(\'在这里，你会遇见志同道合的好友；\')}).fadeIn(2000);");
document.writeln("                        $(\'#background\').fadeOut(500,function(){$(this).css(\'background-image\',\'url(images/teamWork.jpg)\')}).fadeIn(1500);");
document.writeln("                        setTimeout(function(){$(\'.cover #btnNN\').fadeIn(500)},3000);");
document.writeln("                    });");
document.writeln("                });");
document.writeln("                $(document).ready(function(){");
document.writeln("                    $(\'.cover #btnNN\').click(function(){");
document.writeln("                        $(this).fadeOut(500);");
document.writeln("                        $(\'#intro\').fadeOut(1000,function(){$(this).text(\'以及一系列费解的难题。\')}).fadeIn(2000);");
document.writeln("                        $(\'#background\').fadeOut(500,function(){$(this).css(\'background-image\',\'url(images/problem.jpg)\')}).fadeIn(1500);");
document.writeln("                        setTimeout(function(){$(\'.cover #btnNNN\').fadeIn(500)},3000);");
document.writeln("                    });");
document.writeln("                });");
document.writeln("                $(document).ready(function(){");
document.writeln("                    $(\'.cover #btnNNN\').click(function(){");
document.writeln("                        $(this).fadeOut(500);");
document.writeln("                        $(\'#intro\').fadeOut(1000,function(){$(this).text(\'与他们相处的时光总会收获颇丰。\')}).fadeIn(2000);");
document.writeln("                        $(\'#background\').fadeOut(500,function(){$(this).css(\'background-image\',\'url(images/soloTime.jpg)\')}).fadeIn(1500);");
document.writeln("                        setTimeout(function(){$(\'.cover #btnNNNN\').fadeIn(500)},3000);");
document.writeln("                    });");
document.writeln("                });");
document.writeln("                $(document).ready(function(){");
document.writeln("                    $(\'.cover #btnNNNN\').click(function(){");
document.writeln("                        $(this).fadeOut(500);");
document.writeln("                        $(\'#intro\').fadeOut(1000,function(){$(this).text(\'别害怕，“你好，世界！”\')}).fadeIn(2000);");
document.writeln("                        $(\'#background\').fadeOut(500,function(){$(this).css(\'background-image\',\'url(images/helloWorld.jpg)\')}).fadeIn(1500);");
document.writeln("                        setTimeout(function(){$(\'.cover #btnJU\').fadeIn(500)},3000);");
document.writeln("                    });");
document.writeln("                });");
document.writeln("                $(document).ready(function(){");
document.writeln("                    $(\'.cover #btnJU\').click(function(){");
document.writeln("                        $(this).fadeOut(400);");
document.writeln("                        $(\'#intro\').fadeOut(300,function(){$(this).text(\'对，这正是我们的生活方式！\')}).fadeIn(500);");
document.writeln("                        setTimeout(function(){");
document.writeln("                            window.open(\'recruit.html\', \'_blank\');");
document.writeln("                        },2800);");
document.writeln("                    });");
document.writeln("                });");
document.writeln("            </script>");

//button configs
document.writeln("<script>");
document.writeln("                    $(function(){");
document.writeln("                        $(\'#intro\').hide();");
document.writeln("                        $(\'.cover #btnJU\').hide();");
document.writeln("                        $(\'.cover #btnNNNN\').hide();");
document.writeln("                        $(\'.cover #btnNNN\').hide();");
document.writeln("                        $(\'.cover #btnNN\').hide();");
document.writeln("                        $(\'.cover #btnN\').hide();");
document.writeln("                        $(\'.cover #btnS\').hide();");
document.writeln("                        setTimeout(btnStoVisible,6000);");
document.writeln("                    });");
document.writeln("                    function btnStoVisible(){");
document.writeln("                        $(\'.cover #btnS\').fadeIn(1000);");
document.writeln("                    };");
document.writeln("                </script>");

//loading animation
document.writeln("");
document.writeln("        <script>");
document.writeln("            document.onreadystatechange = function () {");
document.writeln("                if(document.readyState==\'complete\') {");
document.writeln("                    $(\'.loadingAnimation\').fadeOut();");
document.writeln("                }");
document.writeln("            }");
document.writeln("        </script>");