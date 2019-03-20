//logs.js
var app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var date = new Date();
var currentHours = date.getHours();
var currentMinute = date.getMinutes();
Page({
  data: {
    userInfo: {},
    temNames: ['创建活动通知'],
    logged: false,
    startDate: "请选择日期",

    multiArray: [['今天', '明天', '3-2', '3-3', '3-4', '3-5'], [0, 1, 2, 3, 4, 5, 6], [0, 10, 20]],
    multiIndex: [0, 0, 0],
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
          wx.navigateBack({
            delta: 1
          })
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
              wx.navigateBack({
                delta: 1
              })
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
          wx.navigateBack({
            delta: 1
          })
        },
        fail: err => {
          console.error(err)
          util.showModel('登录错误', err.message)
        }
      })
    }
  },
  addTemplate: function () {
    var that = this;
    var temNames = ['模板输入', '语音输入', '图片输入'];

    wx.showActionSheet({
      itemList: temNames,
      success: function (res) {
        if (res.tapIndex == 0) {
          wx.navigateTo({
            url: '../create/create'
          })
        }
        if (res.tapIndex == 1) {
          wx.navigateTo({
            url: '../yuyin/yuyin'
          })
        }
        if (res.tapIndex == 2) {
          wx.navigateTo({
            url: '../tuxiang/tuxiang'
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
    var temNames = ['查看全部通知', '查看已提醒通知'];
    wx.showActionSheet({
      itemList: temNames,
      success: function (res) {
        console.log(res.tapIndex);
        if (res.tapIndex == 0) {
          wx.switchTab({
            url: '../schedule/schedule',
          })
        }
        else if (res.tapIndex == 1) {
          wx.navigateTo({
            url: '../remind/remind',
          })
        }
      }
    })
  
  },
  pickerTap: function () {
    date = new Date();

    var monthDay = ['今天', '明天'];
    var hours = [];
    var minute = [];

    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    // 月-日
    for (var i = 2; i <= 28; i++) {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + i);
      var md = (date1.getMonth() + 1) + "-" + date1.getDate();
      monthDay.push(md);
    }

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };

    if (data.multiIndex[0] === 0) {
      if (data.multiIndex[1] === 0) {
        this.loadData(hours, minute);
      } else {
        this.loadMinute(hours, minute);
      }
    } else {
      this.loadHoursMinute(hours, minute);
    }

    data.multiArray[0] = monthDay;
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;

    this.setData(data);
  },




  bindMultiPickerColumnChange: function (e) {
    date = new Date();

    var that = this;

    var monthDay = ['今天', '明天'];
    var hours = [];
    var minute = [];

    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    // 把选择的对应值赋值给 multiIndex
    data.multiIndex[e.detail.column] = e.detail.value;

    // 然后再判断当前改变的是哪一列,如果是第1列改变
    if (e.detail.column === 0) {
      // 如果第一列滚动到第一行
      if (e.detail.value === 0) {

        that.loadData(hours, minute);

      } else {
        that.loadHoursMinute(hours, minute);
      }

      data.multiIndex[1] = 0;
      data.multiIndex[2] = 0;

      // 如果是第2列改变
    } else if (e.detail.column === 1) {

      // 如果第一列为今天
      if (data.multiIndex[0] === 0) {
        if (e.detail.value === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
        // 第一列不为今天
      } else {
        that.loadHoursMinute(hours, minute);
      }
      data.multiIndex[2] = 0;

      // 如果是第3列改变
    } else {
      // 如果第一列为'今天'
      if (data.multiIndex[0] === 0) {

        // 如果第一列为 '今天'并且第二列为当前时间
        if (data.multiIndex[1] === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
      } else {
        that.loadHoursMinute(hours, minute);
      }
    }
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;
    this.setData(data);
  },

  loadData: function (hours, minute) {

    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i);
      }
      // 分
      for (var i = 0; i < 60; i += 10) {
        minute.push(i);
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }
      // 分
      for (var i = minuteIndex; i < 60; i += 10) {
        minute.push(i);
      }
    }
  },

  loadHoursMinute: function (hours, minute) {
    // 时
    for (var i = 0; i < 24; i++) {
      hours.push(i);
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
  },

  loadMinute: function (hours, minute) {
    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i);
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
  },

  bindStartMultiPickerChange: function (e) {
    var that = this;
    var monthDay = that.data.multiArray[0][e.detail.value[0]];
    var hours = that.data.multiArray[1][e.detail.value[1]];
    var minute = that.data.multiArray[2][e.detail.value[2]];
    var month;
    var day;
    if (monthDay === "今天") {
       month = date.getMonth() + 1;
       day = date.getDate();
      monthDay = month + "月" + day + "日";
    } else if (monthDay === "明天") {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + 1);
      month = date1.getMonth() + 1;
      day = date1.getDate() ;
      monthDay = (date1.getMonth() + 1) + "月" + date1.getDate() + "日";

    } else {
       month = monthDay.split("-")[0]; // 返回月
       day = monthDay.split("-")[1]; // 返回日
      monthDay = month + "月" + day + "日";
    }

    var startDate = monthDay + " " + hours + ":" + minute;
    console.log(startDate,month,day,hours,minute)
    var strtime = '2018-'+month+'-'+day+' '+hours+':'+minute+':00:00';
    console.log(strtime)
    var date = new Date(strtime);
    //传入一个时间格式，如果不传入就是获取现在的时间了，这样做不兼容火狐。
    // 可以这样做
    //var date = new Date(strtime.replace(/-/g, '/'));
    console.log(date.getTime())
    
    that.setData({
      startDate: startDate
    })
  },
trash:function(){
  wx.navigateTo({
    url: '../trash/trash'
  })
}
})
