const { mysql } = require('../qcloud')

module.exports = async ctx => {
  // var open_id_object = await mysql('cSessionInfo').where({ skey: ctx.header.skey }).select('open_id').first()
  // console.log(ctx)
  // if (open_id_object) {
  // 数据库存在 skey ，验证通过
  try {

    
    if (ctx.request.body.orcreate==1)
    {
      await mysql('testmodel_task').update({ ordelete: 1 }).where({ id: ctx.request.body.id, open_id: ctx.request.body.open_id, create_time: ctx.request.body.create_time })
      ctx.body = {
        success: true,
        data: await mysql('testmodel_task').where({ open_id: ctx.request.body.open_id, orcreate: ctx.request.body.orcreate, ordelete: 0 }).select('*').orderBy('create_time', 'desc')
      }
    }
    else
    {
      await mysql('testmodel_task').update({ ordelete: 1 }).where({ share_open_id: ctx.request.body.open_id, share_create_time: ctx.request.body.create_time })
      var open_id1 = await mysql('testmodel_task').where({ share_open_id: ctx.request.body.open_id, share_create_time: ctx.request.body.create_time}).select('open_id')
      var open_id = await mysql('testmodel_task').where({ open_id: open_id1[0].open_id, orcreate: 0, ordelete: 0 }).select('share_open_id').orderBy('create_time', 'desc')
      var create_time = await mysql('testmodel_task').where({ open_id: open_id1[0].open_id, orcreate: 0, ordelete: 0 }).select('share_create_time').orderBy('create_time', 'desc')
      var taskdata = []
      for (var i = 0; i < open_id.length; i++) {
        if (open_id[i].share_open_id.length != 0 && create_time[i].share_create_time.length != 0) {
          taskdata.push(await mysql('testmodel_task').where({ open_id: open_id[i].share_open_id, create_time: create_time[i].share_create_time }).select('*'))
        }
      }
      ctx.body = {
        success: true,
        data: taskdata,
      }
    }
    
  } catch (error) {
    ctx.body = {
      success: false,
      errMsg: '删除失败'
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
