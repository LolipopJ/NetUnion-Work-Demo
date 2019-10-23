//Config
let userName = 'netunion';
let pwd = '~/code'
let e_main = $('#main');
let e_input = $('.command-text');
let e_html = $('body,html');
let hostUrl = 'https://shell.recruit.netunion.ondev.cn/run';

let prompt = '<span><span class="group">root</span>@<span class="user">'+userName+'</span>:<span class="position">'+pwd+'</span>#</span> '

//Localstorage
if (!window.localStorage) alert("浏览器不支持localstorage存储，键盘上下键查询历史记录功能已被锁定。");
else {
    var storage = window.localStorage;
    var hisLocation = storage.length;
}

//Input-Resize
window.onresize = function () {
    e_input.width($(document).width() - $('.prompt').width() - 160)
};

//Terminal-Cammand
let shellFunc = (input) => {
    //输入为空时直接渲染
    var ifBlank = input.replace(/\s+/g,'');
    if (input === '' || ifBlank.length == 0){
        e_main.html($('#main').html()+prompt+'<br>');
        e_html.animate({ scrollTop: $(document).height() }, 0);
    }
    
    //输入不为空时
    else {
        cmdHistoryWrite(input);
        hisLocation = storage.length;
        //输入clear命令时清空页面并直接渲染
        if (input === 'clear') {
            e_main.html('');
            e_html.animate({ scrollTop: $(document).height() }, 0);
        }

        //输入其它命令调用API
        else {
            $.ajax({
                url: hostUrl,
                type: 'get',
                data: {cmd: input},
                dataType: 'text',
                //设置同步进行
                async: false,
    
                success: (res) => {
                    console.log(res);
                    //渲染页面
                    e_main.html($('#main').html()+prompt+input+'<br>'+res.replace(/\n/g, '<br/>'));
                    e_html.animate({ scrollTop: $(document).height() }, 0);
                },
                error: (err) => {
                    console.log(err);
                }
            });
        }
    }  
}

//Tab
let tabFunc = (input) => {
    let len = input.length;
    let stoLen = storage.length;
    if (len == 0 ||　stoLen == 0){
        return;
    }
    else {
        let completion = input;
        for (let i = stoLen-1; i >= 0; i--){
            if (storage.getItem(i).substr(0,len) === input) {
                completion = storage.getItem(i);
                break;
            }
        }
        e_input.val(completion);
    }
}

//History
let cmdHistoryWrite = (c) => {
    len = storage.length;
    storage.setItem(len, c);
}

let cmdHistory = (hisLoc) => {
    e_input.val(storage.getItem(hisLoc));
}

//Move caret
function caretMoveEnd(obj) {
    let len = obj.value.length;

    /*
        Chrome bug unfixed: 
        the caret will flicker once
        at the beginning of text.
    */
	if(obj.setSelectionRange) {
		setTimeout(function() {
			obj.setSelectionRange(len, len);
		}, 0);
    }

    else if(obj.createTextRange) {
		let ran = obj.createTextRange();
		ran.move('character', len);
		ran.select();
	}
}

//Keydown
$(document).bind('keydown', function (event) {
    e_input.focus();
    //监听键盘
    //上方向键
    if (event.keyCode === 38){
        //查询上一条历史记录
        hisLocation = parseInt(hisLocation)-1;
        if (hisLocation < 0){
            hisLocation = 0;
            return;
        }
        cmdHistory(hisLocation);
        caretMoveEnd(e_input.get(0));
    }

    //下方向键
    else if (event.keyCode === 40){
        //查询后一条历史记录
        hisLocation = parseInt(hisLocation)+1;
        if (hisLocation > storage.length){
            hisLocation = storage.length;
            return;
        }
        cmdHistory(hisLocation);
    }

    //输入Tab键
    else if (event.keyCode === 9){
        /*
            根据历史记录补全命令
            Bug unfixed:
            will switch to address bar.
        */
        tabFunc(e_input.val());
    }

    //输入回车键
    else if (event.keyCode === 13){
        //渲染页面
        e_main.html($('#main').html());
        e_html.animate({ scrollTop: $(document).height() }, 0);
        shellFunc(e_input.val());
        e_input.val('');
    }
})
