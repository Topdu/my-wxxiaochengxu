// pages/write/write.js
var config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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
    var userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo.openId)
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
      },
      fail: function () {
        // fail
        console.log("fail")
      },
      complete: function () {
        // complete
      }
    })

    wx.navigateBack({
      delta:1
    })
  }
})