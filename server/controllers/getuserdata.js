const { mysql } = require('../qcloud')

module.exports = async ctx => {
  // var open_id_object = await mysql('cSessionInfo').where({ skey: ctx.header.skey }).select('open_id').first()
  // console.log(ctx)
  // if (open_id_object) {
  // 数据库存在 skey ，验证通过
  try {
    var message=[];
    var mes = await mysql('task_message').where({ open_id: ctx.query.open_id, create_time: ctx.query.create_time}).select('message_info')
    if (mes[0])
    {
      mes = JSON.parse(mes[0].message_info)

      for (var i = 0; i < mes.length; i++) {
        if (mes[i].open_id != 'undefined') {
          var mess = await mysql('cSessionInfo').where({ open_id: mes[i].open_id }).select('user_info');

          var res = JSON.parse(mess[0]['user_info'])
          message.push(res)

        }

      }
    }
   
   
    var seemessage=[];
    var open_ids = await mysql('testmodel_task').where({ share_open_id: ctx.query.open_id, share_create_time: ctx.query.create_time }).select('open_id');
    if (open_ids[0])
    {
      for (var i = 0; i < open_ids.length; i++) {
        if (open_ids[i].open_id != 'undefined') {
          var mess = await mysql('cSessionInfo').where({ open_id: open_ids[i].open_id }).select('user_info');

          var res = JSON.parse(mess[0]['user_info'])
          seemessage.push(res)
        }
      }
    }
  
    var res = await mysql('cSessionInfo').where({ open_id: ctx.query.open_id }).select('user_info')
    ctx.body = {
      success: true,
      data: message,
      data1:mes,
      userdata:res,
      seemessage: seemessage,
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
