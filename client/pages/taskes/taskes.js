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
    taskes: ''
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

  onShareAppMessage: function (res) {
    wx.switchTab({
      url: '../schedule/schedule',
    })

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
})