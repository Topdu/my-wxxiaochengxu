const { mysql } = require('../qcloud')

module.exports = async ctx => {
  // var open_id_object = await mysql('cSessionInfo').where({ skey: ctx.header.skey }).select('open_id').first()
  // console.log(ctx)
  // if (open_id_object) {
  // 数据库存在 skey ，验证通过
  try {
    if (ctx.request.body.orcreate == 1) {
      newTask = {
        open_id: ctx.request.body.open_id,
        topic: ctx.request.body.topic,
        task_date: ctx.request.body.task_date,
        task_item: ctx.request.body.task_item,
        task_place: ctx.request.body.task_place,
        task_content: ctx.request.body.task_content,
        view_num: '0',
        alert_num: '0',
        create_time: ctx.request.body.create_time,
        share_open_id: ' ',
        share_create_time: ' ',
        orcreate: ctx.request.body.orcreate
      }
      await mysql('testmodel_task').insert(newTask);
      ctx.body = {
        success: true,
      }
    }
    else {
      var id = await mysql('testmodel_task').where({ open_id: ctx.request.body.open_id, share_create_time: ctx.request.body.share_create_time, share_open_id: ctx.request.body.share_open_id }).select('id')
      if (id.length == 0) {
        newTask = {
          open_id: ctx.request.body.open_id,
          topic: ctx.request.body.topic,
          task_date: ctx.request.body.task_date,
          task_item: ctx.request.body.task_item,
          task_place: ctx.request.body.task_place,
          task_content: ctx.request.body.task_content,
          view_num: '0',
          alert_num: '0',
          create_time: ctx.request.body.create_time,
          share_open_id: ctx.request.body.share_open_id,
          share_create_time: ctx.request.body.share_create_time,
          orcreate: ctx.request.body.orcreate
        }
        await mysql('testmodel_task').insert(newTask);
        ctx.body = {
          success: true,
        }
      }
      else {
        var ordelete = await mysql('testmodel_task').where({ open_id: ctx.request.body.open_id, share_create_time: ctx.request.body.share_create_time, share_open_id: ctx.request.body.share_open_id }).select('ordelete')
        var ordelete1 = parseInt(ordelete[0].ordelete)
        if (ordelete1==1)
        {
          await mysql('testmodel_task').update({ ordelete: 0 }).where({ open_id: ctx.request.body.open_id, share_create_time: ctx.request.body.share_create_time, share_open_id: ctx.request.body.share_open_id })
        }


        ctx.body = {
          success: true,
          // data: await mysql('testmodel_task').where({ open_id: ctx.request.body.open_id }).select('*').orderBy('create_time', 'asc')
        }
      }

    }



  } catch (error) {
    ctx.body = {
      success: false,
      errMsg: id
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
