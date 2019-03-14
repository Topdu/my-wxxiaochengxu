
module.exports = async ctx => {
  try {
 
    request({
      url: ctx.request.body.urls,
      method: 'POST',
      body: 
      {
          //access_token: ctx.request.body.access_token,
          touser: ctx.request.body.touser,
          template_id: ctx.request.body.template_id,
          form_id: ctx.request.body.form_id,
          page: ctx.request.body.page,
          data: {
            "keyword1": { "value": ctx.request.body.keyword1, "color": "#173177" },
            "keyword2": { "value": ctx.request.body.keyword2, "color": "#173177" },
            "keyword3": { "value": ctx.request.body.keyword3, "color": "#173177" },
            "keyword4": { "value": 'asd', "color": "#173177" },
            "keyword5": { "value": ctx.request.body.keyword5, "color": "#173177" },
            "keyword6": { "value": ctx.request.body.keyword6, "color": "#173177" },
            "keyword7": { "value": ctx.request.body.keyword7, "color": "#173177" },
          }
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //输出返回的内容
        console.log(body);
      }
    }
    });

    // await request1.postJson({
    //   url: ctx.request.body.urls, 
    //   body: {
    //     //access_token: ctx.request.body.access_token,
    //     touser: ctx.request.body.touser,
    //     template_id: ctx.request.body.template_id,
    //     form_id: ctx.request.body.form_id,
    //     page: ctx.request.body.page,
    //     data: {
    //       "keyword1": { "value": ctx.request.body.keyword1, "color": "#173177" },
    //       "keyword2": { "value": ctx.request.body.keyword2, "color": "#173177" },
    //       "keyword3": { "value": ctx.request.body.keyword3, "color": "#173177" },
    //       "keyword4": { "value": ctx.request.body.keyword4, "color": "#173177" },
    //       "keyword5": { "value": ctx.request.body.keyword5, "color": "#173177" },
    //       "keyword6": { "value": ctx.request.body.keyword6, "color": "#173177" },
    //       "keyword7": { "value": ctx.request.body.keyword7, "color": "#173177" },
    //     }, //需要放大的关键字 
    //        emphasis_keyword: 'keyword1.DATA' 
    //        }, 
    //        success: function(res)
    //        { 
    //         // console.log(res); 
             
    //          ctx.body = {
    //            success: true,
    //          }
    //        }, 
    //        error: function(err){ 
    //         // console.log(err); 
    //          ctx.body = {
    //            success: false,
    //          }
    //          } 
    //        });

    
  } catch (error) {
    ctx.body = {
      success: false,
      errMsg: error
    }
  }

}
