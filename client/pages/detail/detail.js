// pages/components/taskes/taskes.js

var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textarea1: ' ',
    times: '',
    textarea: '',
    textarea2: '',
    taskes: '未选择',
    message:'asdasd',
    num:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      textarea1: options.textarea1,
      times: options.times,
      textarea: options.place,
      textarea2: options.content,
      taskes: options.taskes1,
      open_id: options.open_id,
      create_time: options.create_time
    })
    console.log('that=' + that.data.textarea1)
    console.log(that.data.open_id)
    console.log(that.data.create_time)

   
  },
  onShareAppMessage: function (res) {
    // console.log(this.data.taskes1, this.data.textarea, this.data.textarea2);
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '这是群公告',
      path: '/pages/sharetaskes/sharetaskes?textarea1=' + this.data.textarea1 + '&times=' + this.data.times + '&taskes1=' + this.data.taskes + '&place=' + this.data.textarea + '&content=' + this.data.textarea2 + '&open_id=' + this.data.open_id + '&create_time=' + this.data.create_time,

      success: function (res) {
        // 转发成功
        console.log(res);

      },
      fail: function (res) {
        // 转发失败
        console.log(res);
      }
    };
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
    var that =this
    wx.request({
      url: config.service.getuserdataUrl,
      data: {
        open_id: that.data.open_id,
        create_time: that.data.create_time
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: {
        "Accept": "application/json"
        // 'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //  that.setData({ textdata: res.data });
        //  console.log(res.data.data[0]['message_info'].split(','));
        //   res = JSON.parse(res.data.data[0]['user_info'])
        console.log(res);
        if (res.data.success) {
          var utl = res.data.data

          var mes = res.data.data1
          console.log(mes)
          var mess = []
          if (mes)
            for (var i = 0; i < mes.length; i++) {
              if (mes[i].message) {
                var messa = {
                  nickName: '', avatarUrl: '', message: ''
                }
                messa.nickName = utl[i].nickName
                messa.avatarUrl = utl[i].avatarUrl
                messa.message = mes[i].message
                mess.push(messa)
              }
            }
          that.setData({
            avatarUrls: utl,
            num: utl.length,
            messag: mess
          })

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

  edit: function () {
    wx.navigateTo({
      url: '../create/create?textarea1=' + this.data.textarea1 + '&times=' + this.data.times + '&taskes1=' + this.data.taskes + '&place=' + this.data.textarea + '&content=' + this.data.textarea2 + '&open_id=' + this.data.open_id + '&create_time=' + this.data.create_time,
    })
  },
  writemessage:function()
  {
    wx.navigateTo({
      url: '../write/write?open_id=' + this.data.open_id + '&create_time=' + this.data.create_time,
    })
  }
})