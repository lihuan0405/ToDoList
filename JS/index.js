$(function () {
    load();
    $('#title').on('keydown', function (e) {
        if (e.keyCode === 13) {
            if ($('#title').val() === '') { alert('请输入待办事项') } else {
                //   1.  先读取本地存储的数据
                var local = getData();
                //   2.   把local数据进行更新 数组追加push
                local.push({ title: $(this).val(), done: false })
                //   3.   把local存到本地存储中
                saveData(local)
                //   4.   将本地存储渲染到页面中
                load();
                $('#title').val('');
            }
        }
    })
    //   5.  点击 a 删除li
    $('.demo-box, .donelist').on('click', 'a', function () {
        //    5.1   先获取本地存储
        var data = getData();
        //    5.2   修改数据
        var index = $(this).attr('id');
        data.splice(index, 1);
        // data[index]
        //    5.3   保存到本地存储
        saveData(data);
        //    5.4   渲染页面
        load();
    })

    //  6.  复选框 checked false是正在进行 true是已经完成
    $('.demo-box, .donelist').on('click', 'input', function () {
        //    6.1   先获取本地存储
        var data = getData();
        //    6.2   修改数据
        var index = $(this).siblings('a').attr('id');
        // console.log(index);
        // console.log(index, $(this).prop('checked'), data);
        data[parseInt(index)].done = $(this).prop('checked');
        //    6.3   保存到本地存储
        saveData(data);
        //    6.4   渲染页面
        load();
    })

    //  1.   声明本地存储的数据
    function getData() {
        var data = localStorage.getItem('todolist')
        if (data !== null) {
            return JSON.parse(data)
        } else {
            return []
        }
    }

    //   3.   把local存到本地存储中
    function saveData(data) {
        localStorage.setItem('todolist', JSON.stringify(data));
    }

    // 4.   将本地存储渲染到页面中
    function load() {
        var data = getData();
        var todoCount = 0, doneCount = 0;
        //  遍历之前 把ol的孩子们都清空
        $('ol,ul').empty();
        $.each(data, function (i, n) {
            if (n.done) {
                $('ul').prepend('<li>' + '<input type="checkbox" checked = "checked">' + '<p>' + n.title + '</p>' + '<a href="javascript:;"   id =" ' + i + '">❎</a></li >')
                doneCount++
            } else {
                $('ol').prepend('<li>' + '<input type="checkbox">' + '<p>' + n.title + '</p>' + '<a href="javascript:;"id =" ' + i + '">❎</a></li >')
                todoCount++;
            }
        })
        $('#todocount').text(todoCount);
        $('#donecount').text(doneCount);
    }
})