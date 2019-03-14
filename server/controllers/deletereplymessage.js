const { mysql } = require('../qcloud')

module.exports = async ctx => {
  // var open_id_object = await mysql('cSessionInfo').where({ skey: ctx.header.skey }).select('open_id').first()
  // console.log(ctx)
  // if (open_id_object) {
  // 数据库存在 skey ，验证通过
  try {

    var view = await mysql('task_message').where({ open_id: ctx.query.open_id, create_time: ctx.query.create_time }).select('message_info')
   
       {
        var message = JSON.parse(view[0].message_info)
        for (var i = 0; i < message.length; i++) {
          if (message[i].open_id == ctx.query.openidview) {
            message[i].replymessage=='';

            await mysql('task_message').update({ message_info: JSON.stringify(message) }).where({ open_id: ctx.query.open_id, create_time: ctx.query.create_time })

            ctx.body = {
              success: true,

              data1: await mysql('task_message').where({ open_id: ctx.query.open_id, create_time: ctx.query.create_time }).select('message_info')
            }

          }

        }
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
