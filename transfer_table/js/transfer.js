$(function() {
  var dataL = [
    {"code": "2019-11-29", "name": "世界大事件之乌云遮天"},
    {"code": "2018-11-29", "name": "世界大事件之朗日晴空"},
    {"code": "2017-11-29", "name": "世界大事件之夜黑风高"},
    {"code": "2016-11-29", "name": "世界大事件之风雨交加"},
    {"code": "2015-11-29", "name": "世界大事件之风驰电掣"}
  ]
  var dataR = [
    {"code": "0001", "name": "世界大事件之变形金刚"},
    {"code": "0002", "name": "世界大事件之极速飞车"}
  ]
  $('#tb1').html(tableHtmlStr(dataL))
  $('#tb2').html(tableHtmlStr(dataR))

  // 全选、全取消
  $(document).on('click', 'th>input', allchecked)

  // 单个勾选，检测全选是否勾选
  $(document).on('click', 'td>input', function(e){
    // console.log($(e.target).parents('tbody').find('input'))
    var allCheckedState = true;
    $(e.target).parents('tbody').find('input').each(function(index,item){
      if(!item.checked) {
        allCheckedState = false;
      }
    })
    if(allCheckedState) {
      $(e.target).parents('table').find('th>input').prop('checked',true)
    }else {
      $(e.target).parents('table').find('th>input').prop('checked',false)
    }
  })

  // 移到右边
  $(document).on('click', '#remove', function(){
    if(!$('#transfer1 th input:checked').is(':checked')) {
      $('#transfer1 input:checked').parents("tr").appendTo('#tb2')
    }else {
      $('#tb1 tr').appendTo('#tb2')
    }
    $('#transfer1').find('input:checked').prop('checked',false);
    $('#transfer2').find('input:checked').prop('checked',false);
  })

  // 移到左边
  $(document).on('click', '#add', function(){
    if(!$('#transfer2 th input:checked').is(':checked')) {
      $('#transfer2 input:checked').parents("tr").appendTo('#tb1')
    }else {
      $('#tb2 tr').appendTo('#tb1')
    }
    $('#transfer1').find('input:checked').prop('checked',false);
    $('#transfer2').find('input:checked').prop('checked',false);
  })

  // 获取左边框的内容
  $(document).on('click', '#submit', function() {
    // console.log($('#tb1 tr'))
    var reqData = []
    $('#tb1 tr').each(function(index, item) {
      var code = $(item).find('td').eq(1).attr('title')
      var name = $(item).find('td').eq(2).attr('title')
      // console.log(code, name)
      reqData.push({"code": code, "name": name})
    })
    console.table(reqData)
  })
})

// 全选
function allchecked(e) {
  if($(e.target).prop('checked')) {
    $('th input:checked').parents('table').find('input').prop('checked', true)
  }else {
    $(e.target).parents('table').find('input').prop('checked', false)
  }
}

// 生成表格
function tableHtmlStr(data) {
  var htmlStr = ''
  $(data).each(function(index, item) {
    htmlStr += "<tr><td><input type='checkbox'></td><td title="+item.code+">"+item.code+"</td><td title="+item.name+">"+item.name+"</td></tr>"
  })
  return htmlStr
}