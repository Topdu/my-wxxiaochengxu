const { mysql } = require('../qcloud')

module.exports = async ctx => {
  // var open_id_object = await mysql('cSessionInfo').where({ skey: ctx.header.skey }).select('open_id').first()
  // console.log(ctx)
  // if (open_id_object) {
  // 数据库存在 skey ，验证通过
  try {
      newTask = {
        open_id: ctx.query.open_id,
        remind_time: ctx.query.remind_time,
        form_id:ctx.query.form_id,
        key1:ctx.query.key1,
        key2:ctx.query.key2,
        key3:ctx.query.key3,
        key4:ctx.query.key4,
        key5:ctx.query.key5,
        creater_open_id: ctx.query.creater_open_id,
        creater_create_time: ctx.query.creater_create_time,
      }

    await mysql('message_remind').insert(newTask)
    ctx.body = {
      success: true,
      // data: await mysql('testmodel_task').where({ open_id:ctx.query.open_id }).select('*').orderBy('create_time', 'asc')
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
