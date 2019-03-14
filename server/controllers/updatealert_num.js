const { mysql } = require('../qcloud')

module.exports = async ctx => {
  // var open_id_object = await mysql('cSessionInfo').where({ skey: ctx.header.skey }).select('open_id').first()
  // console.log(ctx)
  // if (open_id_object) {
  // 数据库存在 skey ，验证通过
  try {

  
    var alert_num = await mysql('testmodel_task').where({ open_id: ctx.query.open_id, create_time: ctx.query.create_time }).select('alert_num')
    var alert_num1 = parseInt(alert_num[0].alert_num) + 1
    await mysql('testmodel_task').update({ alert_num: alert_num1 }).where({ open_id: ctx.query.open_id, create_time: ctx.query.create_time })
    ctx.body = {
      success: true,
      data: alert_num1,
     
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
