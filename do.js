layui.use(['table', 'slider'], function () {
    var model = 0
    /* 模式切换：0为考试模式；1为练习模式 */
    var table = layui.table
        , $ = layui.$
        , slider = layui.slider;
    var Tdiff = 50;
    var Tnum = 100;
    function re_table(num, diff) {
        TD = table.render({
            elem: '#test'
            , data: alu(num, diff)
            , loading: true
            , even: true
            , defaultToolbar: ['print']
            , toolbar: '#toolbarDemo'
            , page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'] //自定义分页布局
                //,curr: 5 //设定初始在第 5 页
                , groups: 3 //只显示 1 个连续页码
                , first: false //不显示首页
                , last: false //不显示尾页

            }
            , cols: [[
                { field: 'id', width: 80, title: '题号' }
                , { field: 'title', width: 490, title: '题目' }
                , { field: 'diff', width: 300, title: '难度' }
                , { field: 'ans', width: 150, title: '答案', edit: 'text' }
                , { fixed: 'right', width: 115, toolbar: '#barDemo', title: '操作' }
            ]]

        });
    }
    var TD = table.render({
        elem: '#test'
        , data: alu(100, Tdiff)
        , loading: true
        , even: true
        , defaultToolbar: ['print']
        , toolbar: '#toolbarDemo'
        , page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'] //自定义分页布局
            //,curr: 5 //设定初始在第 5 页
            , groups: 3 //只显示 1 个连续页码
            , first: false //不显示首页
            , last: false //不显示尾页

        }
        , cols: [[
            { field: 'id', width: 80, title: '题号' }
            , { field: 'title', width: 490, title: '题目' }
            , { field: 'diff', width: 300, title: '难度' }
            , { field: 'ans', width: 150, title: '答案', edit: 'text' }
            , { fixed: 'right', width: 115, toolbar: '#barDemo', title: '操作' }
        ]]

    });
    table.on('toolbar(do)', function (obj) {
        if (obj.event === 'reDo') {
            re_table(Tnum, Tdiff)
        }
        else if (obj.event == "submit") {
            var sum = 0;
            var right = 0;
            var erro_info = new Array()
            var str_html = ""
            //+ '</table>'
            for (var i = 0; i < TD.config.data.length; i++) {
                if (TD.config.data[i].ans != undefined && TD.config.data[i].ans != "") {
                    sum++;
                    if (TD.config.data[i].ans == TD.config.data[i].res) {
                        right++
                    }
                    else {
                        console.log(TD.config.data[i])
                        str_html += '<tr>'
                            + '<td>' + TD.config.data[i].id + '</td>'
                            + '<td>' + TD.config.data[i].title + '</td>'
                            + '<td>' + TD.config.data[i].ans + '</td>'
                            + '<td>' + TD.config.data[i].res + '</td>'
                            + '</tr>'
                    }
                }
            }
            var show_html = '<div>'
                + '<fieldset class="layui-elem-field layui-field-title layui-box" style="margin-top: 20px;">'
                + '<legend>得分：' + right + '</legend>'
                + '</fieldset>'
                + '<div class="layui-row">'
                + '<div class="layui-col-sm3">'
                + '<div style="text-align: center"><i class="layui-icon" style="color: #1E9FFF;">&#xe67a;</i>  总共：' + Tnum + '题</div>'
                + '</div >'
                + '<div class="layui-col-sm3">'
                + '<div style="text-align: center"><i class="layui-icon" style="color: #1E9FFF;">&#xe6af;</i>  做了：' + sum + '题</div>'
                + '</div>'
                + '<div class="layui-col-sm3">'
                + '<div style="text-align: center"><i class="layui-icon" style="color: #1E9FFF;">&#xe664;</i>  做对：' + right + '题</div>'
                + '</div>'
                + '<div class="layui-col-sm3">'
                + '<div style="text-align: center"><i class="layui-icon" style="color: #1E9FFF;">&#xe69c;</i>  做错：' + (sum - right) + '题</div>'
                + '</div>'
                + '</div >'
                + '<table class="layui-table">'
                + '<colgroup>'
                + '<col width="50">'
                + '<col width="200">'
                + '<col width="100">'
                + '<col width="100">'
                + '</colgroup>'
                + '<thead>'
                + '<tr>'
                + '<th>题号</th>'
                + '<th>题目</th>'
                + '<th>你的答案</th>'
                + '<th>正确答案</th>'
                + '</tr>'
                + '</thead>'
                + '<tbody>'
                + str_html
                + '</tbody>'
                + '</table>'
                + '</div>'
            if (sum == 0) {
                layer.alert('你交白卷了，系统不会给分', {
                    icon: 5,
                    skin: 'layer-ext-moon'
                })
            }
            else if (sum != Tnum) {
                var confirm = layer.confirm('你还有 ' + (Tnum - sum) + ' 题没完成', {
                    btn: ['确认提交？', '返回继续做'] //按钮
                }, function () {
                    layer.close(confirm)
                    layer.open({
                        type: 1,
                        anim: 2,
                        skin: 'layui-layer-lan',
                        area: ['600px', '360px'],
                        content: show_html
                    });
                }, function () {
                    layer.msg('继续加油哦！');
                });
            }

            // console.log(TD)
            // console.log(TD.config.data)
            // console.log(TD.config.data.ans.length)
        }
        else if (obj.event == "switch") {
            if (model == 0) {
                layer.alert('切换为练习模式，\n练习模式下你可以随时查看答案')
                model = 1
            }
            else if ((model == 1)) {
                layer.alert('切换为考试模式，\n考试模式下你不可以查看答案')
                model = 0
            }

        }
        else if (obj.event == "setting") {
            console.log('题目设置')
            layer.open({
                title: ['题目设置', 'font-size:18px;'],
                btn: ['确定', '取消'],
                type: 1,
                anim: 2,
                area: ['600px', '360px'],
                success: function (layero, index) {
                    console.log(layero, index);
                    slider_num = slider.render({
                        elem: '#slideNum'
                        , input: true
                        , theme: '#1E9FFF' //主题色
                        , value: Tnum //初始值
                        , change: function (value) {
                            Tnum = value
                            // console.log(value[0]) //得到开始值
                            //console.log(Tnum) //得到结尾值
                        }
                    });
                    slider_diff = slider.render({
                        elem: '#slideDiff'
                        , input: true
                        , theme: '#1E9FFF' //主题色
                        , value: Tdiff //初始值
                        , change: function (value) {
                            Tdiff = value
                            // console.log(value[0]) //得到开始值
                            //console.log(Tdiff) //得到结尾值
                        }
                        /* , setTips: function (value) { //自定义提示文本
                            if (value <= 10) return '简单题目' + '<i class="layui-icon">&#xe650;</i>';
                            else if (value > 10 && value <= 60) return '题目难有所增加哦' + '<i class="layui-icon">&#xe6af;</i>';
                            else if (value > 60 && value <= 90) return '题目难有所增加哦' + '<i class="layui-icon">&#xe664;</i>';
                            else return '开始变态' + '<i class="layui-icon">&#xe756;</i>';
                        } */
                    });

                },
                yes: function () {
                    re_table(Tnum, Tdiff)
                    console.log('btn2: function')
                    layer.closeAll();
                },
                skin: 'layui-layer-lan',
                area: ['600px', '360px'],
                content: $('#settingDemo').html()
            });
        }
    });
    table.on('tool(do)', function (obj) {
        var data = obj.data;
        console.log(obj)
        if (obj.event === 'del') {
            layer.confirm('确认重置吗', function (index) {
                //console.log(obj)
                obj.update({
                    ans: ""
                });
                layer.close(index);
            });
        } else if (obj.event === 'info') {
            if (model == 0) {
                layer.alert('当前为考试模式，你不可以查看答案')
            }
            else {
                layer.alert('答案是:' + data.res, {
                    skin: 'layui-layer-lan'
                    , closeBtn: 0
                    , anim: 4 //动画类型
                });
            }

        }
    });
});