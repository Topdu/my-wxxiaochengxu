const { mysql } = require('../qcloud')

module.exports = async ctx => {
  // var open_id_object = await mysql('cSessionInfo').where({ skey: ctx.header.skey }).select('open_id').first()
  // console.log(ctx)
  // if (open_id_object) {
  // 数据库存在 skey ，验证通过
  try {
   
    var view = await mysql('task_message').where({ open_id: ctx.query.open_id, create_time: ctx.query.create_time }).select('message_info')
    if (ctx.query.deletemessage == 0) {
     
      if (ctx.query.replyopen_id)
      {
        var message = JSON.parse(view[0].message_info)

        for (var i = 0; i < message.length; i++) {
          if (message[i].open_id == ctx.query.replyopen_id) {
            message[i].replymessage = ctx.query.replymessage

            await mysql('task_message').update({ message_info: JSON.stringify(message) }).where({ open_id: ctx.query.open_id, create_time: ctx.query.create_time })
            ctx.body = {
              success: true,
       
            }

          }
            
          }

        
      }
      else
      {
        var message = JSON.parse(view[0].message_info)
        for (var i = 0; i < message.length; i++) {
          if (message[i].open_id == ctx.query.openidview) {
            message.splice(i, 1)

            await mysql('task_message').update({ message_info: JSON.stringify(message) }).where({ open_id: ctx.query.open_id, create_time: ctx.query.create_time })

            ctx.body = {
              success: true,

              data1: await mysql('task_message').where({ open_id: ctx.query.open_id, create_time: ctx.query.create_time }).select('message_info')
            }

          }

        }
      }

    
 
  
    }
    else
    {

    

    if (view.length == 0) {
      var message = [];
      var mes ={
        open_id:'',message:''
      }
      mes.open_id = ctx.query.openidview
      mes.message = ctx.query.message
      message.push(mes)
      newTask = {
        open_id:  ctx.query.open_id,
        create_time: ctx.query.create_time,
        message_info: JSON.stringify(message)
      }
      await mysql('task_message').insert(newTask)
      var viewnum = await mysql('testmodel_task').where({ open_id: ctx.query.open_id, create_time: ctx.query.create_time }).select('view_num')
      var viewnum1 = parseInt(viewnum[0].view_num) + 1
      await mysql('testmodel_task').update({ view_num: viewnum1 }).where({ open_id: ctx.query.open_id, create_time: ctx.query.create_time })
    }
    else {
      var message=JSON.parse(view[0].message_info)
      var flag=0,f=0;
      for(var i=0;i<message.length;i++)
      {
        if (message[i].open_id == ctx.query.openidview)
        {
          f=1;
          if (ctx.query.message=='')
          {
            break;
          }
          else
          {
            message[i].message = ctx.query.message
            await mysql('task_message').update({ message_info: JSON.stringify(message) }).where({ open_id: ctx.query.open_id, create_time: ctx.query.create_time })
            break;
          }
         
        }
    
      }
      if(f==0)
      {
        
        var viewnum = await mysql('testmodel_task').where({ open_id: ctx.query.open_id, create_time: ctx.query.create_time }).select('view_num')
        var viewnum1 = parseInt(viewnum[0].view_num) + 1
        await mysql('testmodel_task').update({ view_num: viewnum1 }).where({ open_id: ctx.query.open_id, create_time: ctx.query.create_time })
        var mes = {
          open_id: '', message: ''
        }
        mes.open_id = ctx.query.openidview
        mes.message = ctx.query.message
        if (ctx.query.message!='')
        {
          message.push(mes)
          await mysql('task_message').update({ message_info: JSON.stringify(message) }).where({ open_id: ctx.query.open_id, create_time: ctx.query.create_time })
        }
       
      }
      

      
    }
    ctx.body = {
      success: true,
      data: viewnum1,
      data1: await mysql('task_message').where({ open_id: ctx.query.open_id, create_time: ctx.query.create_time }).select('message_info')
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
