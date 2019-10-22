let e_main = $('#main');
let e_input = $('.command-text');
let e_html = $('body,html');
let hostUrl = 'https://shell.recruit.netunion.ondev.cn/run';

//Terminal
window.onresize = function () {
    e_input.width($(document).width() - $('.prompt').width() - 160)
};

//Config
let userName = 'netunion';

//Terminal-Cammand
let shellFunc = (input) => {
    //输入为空时直接渲染
    if (input === ''){
        e_main.html($('#main').html()+'<span><span class="group">root</span>@<span class="user">'+userName+'</span>:<span class="position">~</span>#</span> '+'<br>');
        e_html.animate({ scrollTop: $(document).height() }, 0);
    }

    //输入clear命令时清空页面并渲染
    else if (input === 'clear') {
        e_main.html('');
        e_html.animate({ scrollTop: $(document).height() }, 0);
    }
    
    //输入不为空时调用API
    else {
        $.ajax({
            url: hostUrl,
            type: 'get',
            data: {cmd: input},
            //设置同步进行
            async: false,
            dataType: 'text',
            success: (res) => {
                console.log(res);
                e_main.html($('#main').html()+'<span><span class="group">root</span>@<span class="user">'+userName+'</span>:<span class="position">~</span>#</span> '+input+'<br>'+res.replace(/\n/g, '<br/>'));
                e_html.animate({ scrollTop: $(document).height() }, 0);
            }
        });
    }  
}

$(document).bind('keydown', function (event) {
    e_input.focus();
    //上方向键
    if (event.keyCode === 38){
        //查询上一条历史记录
    }

    //下方向键
    if (event.keyCode === 40){
        //查询后一条历史记录

    }

    //输入Tab键
    if (event.keyCode === 9){
        //根据历史记录补全命令

    }

    //输入回车键
    if (event.keyCode === 13){
        //渲染页面
        e_main.html($('#main').html());
        e_html.animate({ scrollTop: $(document).height() }, 0);
        shellFunc(e_input.val());
        e_input.val('');
    }
})

//Localstorage
if (!window.localStorage) alert("浏览器不支持localstorage存储，键盘上下键查询历史记录功能已被锁定。");
else {
    var storage = window.localStorage;
    
}
