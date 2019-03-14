// pages/write/write.js

var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  showmessage:'none',
  text:'写留言'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options.replyopen_id)
    {
      that.setData({
        open_id: options.open_id,
        create_time: options.create_time,
        replyopen_id: options.replyopen_id,
        replynickName: options.replynickName,
        replyavatarUrl: options.replyavatarUrl,
        replymessage: options.replymessage,
        showmessage:'',
        text: '回复' + options.replynickName,
      })
    }
    that.setData({
      open_id: options.open_id,
      create_time: options.create_time
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  text: function (e) {
    this.setData({
      textarea: e.detail.value
    })
  },
  OK:function(){
    var that = this

    if(that.data.replyopen_id)
    {
      console.log(that.data.replyopen_id)
      var replyopen_id = that.data.replyopen_id
      if (that.data.textarea) {
        wx.request({
          url: config.service.updatedataUrl,
          data: {
            replyopen_id: that.data.replyopen_id,
            open_id: that.data.open_id,
            create_time: that.data.create_time,
           
            replymessage: that.data.textarea,
            deletemessage:0
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          header: {
            "Accept": "application/json"
            // 'content-type': 'application/x-www-form-urlencoded'
          },

          success: function (res) {
            //  that.setData({ textdata: res.data });
            console.log(res.data);
            if (res.data.success) {
              util.showSuccess('回复成功');
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000);

            }
          },
          fail: function () {
            // fail
            console.log("fail")
          },
          complete: function () {
            // complete
          }
        })

      }
    }
    else
    {

    
      var userInfo = wx.getStorageSync('userInfo');
      console.log(userInfo.openId)
      console.log(that.data.textarea)
      if (that.data.textarea)
      {
        wx.request({
          url: config.service.updatedataUrl,
          data: {
            open_id: that.data.open_id,
            create_time: that.data.create_time,
            openidview: userInfo.openId,
            message: that.data.textarea
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          header: {
            "Accept": "application/json"
            // 'content-type': 'application/x-www-form-urlencoded'
          },

          success: function (res) {
            //  that.setData({ textdata: res.data });
            console.log(res.data);
            if(res.data.success)
            {
              util.showSuccess('留言成功');
              setTimeout(function(){
                wx.navigateBack({
                  delta: 1
                })
              },1000);
              
            }
          },
          fail: function () {
            // fail
            console.log("fail")
          },
          complete: function () {
            // complete
          }
        })

      }
    }

   
  }
})