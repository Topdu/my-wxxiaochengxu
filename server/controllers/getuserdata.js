const { mysql } = require('../qcloud')

module.exports = async ctx => {
  // var open_id_object = await mysql('cSessionInfo').where({ skey: ctx.header.skey }).select('open_id').first()
  // console.log(ctx)
  // if (open_id_object) {
  // 数据库存在 skey ，验证通过
  try {
    var message=[];
    var mes = await mysql('task_message').where({ open_id: ctx.query.open_id, create_time: ctx.query.create_time}).select('message_info')
    mes = JSON.parse(mes[0].message_info)
    for(var i=0;i<mes.length;i++)
    {
      var mess = await mysql('cSessionInfo').where({ open_id:mes[i].open_id }).select('user_info')
      var res = JSON.parse(mess[0]['user_info'])
      message.push(res)


    }
    var res = await mysql('cSessionInfo').where({ open_id: ctx.query.open_id }).select('user_info')
    ctx.body = {
      success: true,
      data: message,
      data1:mes,
      userdata:res
    }
  } catch (error) {
    ctx.body = {
      success: false,
      errMsg: error
    }
  }
  // } else {
  //   // 查询结果为 undefined ，验证不通过
  //   ctx.body = {
  //     success: false,
  //     errMsg: 'skey不存在，验证不通过'
  //   }
  // }
}
