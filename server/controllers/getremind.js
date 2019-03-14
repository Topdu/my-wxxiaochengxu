const { mysql } = require('../qcloud')

module.exports = async ctx => {
  // var open_id_object = await mysql('cSessionInfo').where({ skey: ctx.header.skey }).select('open_id').first()
  // console.log(ctx)
  // if (open_id_object) {
  // 数据库存在 skey ，验证通过
  try {

    if (ctx.query.deleteremind)
    {
      await mysql('message_remind').update({ or_remind: 1, or_delete: 1 }).where({ id: ctx.query.id,open_id: ctx.query.open_id, creater_create_time: ctx.query.creater_create_time, creater_open_id: ctx.query.creater_open_id,remind_time:ctx.query.remind_time })
      ctx.body = {
        success: true,
      }
    }
    else
    {
      var remind_message = await mysql('message_remind').where({ open_id: ctx.query.open_id, or_delete: 0}).select('*').orderBy('remind_time', 'desc');

      ctx.body = {
        success: true,
        remind_message: remind_message,

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
