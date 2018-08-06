
module.exports = async ctx => {
  try {
    try{
      wx.request({
        url: ctx.request.body.urls,
        data:
          {
            access_token: ctx.request.body.access_token,
            touser: ctx.request.body.touser,
            template_id: ctx.request.body.template_id,
            form_id: ctx.request.body.form_id,
            page: ctx.request.body.page,
            data: {
              "keyword1": { "value": ctx.request.body.keyword1, "color": "#173177" },
              "keyword2": { "value": ctx.request.body.keyword2, "color": "#173177" },
              "keyword3": { "value": ctx.request.body.keyword3, "color": "#173177" },
              "keyword4": { "value": ctx.request.body.keyword4, "color": "#173177" },
              "keyword5": { "value": ctx.request.body.keyword5, "color": "#173177" },
              "keyword6": { "value": ctx.request.body.keyword6, "color": "#173177" },
              "keyword7": { "value": ctx.request.body.keyword7, "color": "#173177" },
            },
          },
        method: 'POST',
        success: function (res) {
          //console.log(res)
          ctx.body = {
            success: true,
          }
        },
        fail: function (err) {
          console.log('request fail ', err);
        },
        complete: function (res) {
          console.log("request completed!");
        }
      })
    }
    catch(error)
    {
      ctx.body = {
        success: falses,
        errMsg: error
      }
    }
    
  } catch (error) {
    ctx.body = {
      success: false,
      errMsg: error
    }
  }

}
