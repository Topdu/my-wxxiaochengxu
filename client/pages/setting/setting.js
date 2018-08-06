//logs.js
var app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({
  data: {
    userInfo: {},
    temNames: ['创建活动通知'],
    logged: false,
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo
    //   })
    // }
    wx.getStorage({
      key: 'temNames',
      success: function (res) {
        that.setData({
          temNames: res.data
        })
      }
    })
  },
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'temNames',
      success: function (res) {
        that.setData({
          temNames: res.data
        })
      }
    })
    var userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo.openId)
    if (userInfo.openId) {
      that.setData({ userInfo: userInfo,logged:true})
    }
  },
  bindGetUserInfo: function () {
    if (this.data.logged) return

    util.showBusy('正在登录')

    const session = qcloud.Session.get()

    if (session) {
      // 第二次登录
      // 或者本地已经有登录态
      // 可使用本函数更新登录态
      qcloud.loginWithCode({
        success: res => {
          this.setData({ userInfo: res, logged: true })
          console.log(res)
          wx.setStorage({
            key: 'userInfo',
            data: res,
          });
          util.showSuccess('登录成功')

        },
        fail: err => {
          
          qcloud.login({
            success: res => {
              this.setData({ userInfo: res, logged: true })
              util.showSuccess('登录成功')
              console.log(res)
              wx.setStorage({
                key: 'userInfo',
                data: res,
              });

            },
            fail: err => {
              console.error(err)
              util.showModel('登录错误', err.message)
            }
          })
          //console.error(err)
         // util.showModel('登录错误', err.message)
        }
      })
    } else {
      // 首次登录
      qcloud.login({
        success: res => {
          this.setData({ userInfo: res, logged: true })
          util.showSuccess('登录成功')
          console.log(res)
          wx.setStorage({
            key: 'userInfo',
            data: res,
          });

        },
        fail: err => {
          console.error(err)
          util.showModel('登录错误', err.message)
        }
      })
    }
  },
  addTemplate: function () 　{
    var that = this;
    var temNames = this.data.temNames;
    wx.showActionSheet({
      itemList: temNames,
      success: function (res) {
        if (res.tapIndex >= 0) {
          wx.navigateTo({
            url: '../create/create?tapIndex=' + res.tapIndex
          })
        }
      }
    })
  },
  setting: function () {
    wx.navigateTo({
      url: '../selfsetting/selfsetting'
    })
  },
  schedule: function () {
    wx.switchTab({
      url: '../schedule/schedule',
    })
  },
 
})
