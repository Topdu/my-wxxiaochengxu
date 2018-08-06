// const { mysql } = require('../qcloud')

// module.exports = async ctx => {

//   try {
   
 
//     var view = await mysql('task_message').where({ open_id: 'a1asd', create_time: 'a1asd' }).select('message_info')
//   if(view.length==0)
//   {
//     var message = [];
//     message.push("asdasd")
//     message.push("asdasd")

//     newTask = {
//       open_id: 'a1asd',
//       //ctx.query.open_id,

//       create_time:'a1asd', 
//       //ctx.query.create_time,
//       message_info: message.toString()
//     }

//     await mysql('task_message').insert(newTask)
//     ctx.body = {
//       success: true,
//       data: view
//     }
//   }
//   else
//   {
//     ctx.body = {
//       success: true,
//       data: view[0].message_info.split(',')
//     }
    
//   }
//   } catch (error) {
//     ctx.body = {
//       success: false,
//       errMsg: error
//     }
//   }

// }
const { mysql } = require('../qcloud')

module.exports = async ctx => {
  // var open_id_object = await mysql('cSessionInfo').where({ skey: ctx.header.skey }).select('open_id').first()
  // console.log(ctx)
  // if (open_id_object) {
  // 数据库存在 skey ，验证通过
  try {
    var open_id = await mysql('testmodel_task').where({ open_id: 'oufME0Y8Na0e-6uXLmmLfxJVK8Xo', orcreate: 0, ordelete: 0 }).select('share_open_id').orderBy('create_time', 'desc')
    var create_time = await mysql('testmodel_task').where({ open_id: 'oufME0Y8Na0e-6uXLmmLfxJVK8Xo',  orcreate: 0, ordelete: 0 }).select('share_create_time').orderBy('create_time', 'desc')
    var taskdata = []
    for (var i = 0;i< open_id.length; i++) {
      if (open_id[i].share_open_id.length != 0 && create_time[i].share_create_time.length!=0)
      {
        taskdata.push(await mysql('testmodel_task').where({ open_id: open_id[i].share_open_id, create_time: create_time[i].share_create_time }).select('*'))
      }
     
    }
    ctx.body = {
      success: true,
      data: open_id,
      data1:create_time,
      ad: taskdata,
      
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

