const { mysql } = require('../qcloud')

module.exports = async ctx => {
  // var open_id_object = await mysql('cSessionInfo').where({ skey: ctx.header.skey }).select('open_id').first()
  // console.log(ctx)
  // if (open_id_object) {
  // 数据库存在 skey ，验证通过
  try {
  



    var mess = await mysql('testmodel_task').where({ open_id: ctx.query.open_id, create_time: ctx.query.create_time }).select('ordelete')
   if(mess)
   {
     if(mess[0].ordelete==1)
     {
       ctx.body = {
         success: true,
        
       }
     }
     else
     {
       ctx.body = {
         success: false,

       }
     }
   }
   else
   {
     ctx.body = {
       success: false,
     
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
