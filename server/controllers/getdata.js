
const { mysql } = require('../qcloud')

module.exports = async ctx => {
  // var open_id_object = await mysql('cSessionInfo').where({ skey: ctx.header.skey }).select
  try {
    var open_id = await mysql('testmodel_task').where({ open_id: ctx.query.open_id, orcreate: 0, ordelete: 0 }).select('share_open_id').orderBy('create_time', 'desc')
    var create_time = await mysql('testmodel_task').where({ open_id: ctx.query.open_id, orcreate: 0, ordelete: 0 }).select('share_create_time').orderBy('create_time', 'desc')
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

