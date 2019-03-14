// pages/components/taskes/taskes.js

var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var date = new Date();
var currentHours = date.getHours();
var currentMinute = date.getMinutes();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textarea1: ' ',
    times: '',
    textarea: '',
    textarea2: '',
    taskes: '',
    startDate: "请选择日期",

    multiArray: [['今天', '明天', '3-2', '3-3', '3-4', '3-5'], [0, 1, 2, 3, 4, 5, 6], [0, 10, 20]],
    multiIndex: [0, 0, 0],
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
   
    var userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo.openId)
    if (!userInfo.openId) {
      wx.showModal({
        title: '登录',
        content: '您还未登录，请前往登录',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.switchTab({
              url: '../setting/setting',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')

          }
        }
      }) 
    }
    
   
    if (userInfo.openId)
    {
      wx.request({
        url: config.service.checkloginUrl,
        data: {
          open_id: userInfo.openId,
          
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

            wx.request({
              url: config.service.updatedataUrl,
              data: {
                open_id: that.data.open_id,
                create_time: that.data.create_time,
                openidview: userInfo.openId,
                message: ''
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
          }
          else
          {
            try {
              wx.removeStorageSync('userInfo')
              wx.showModal({
                title: '登录',
                content: '您还未登录，请前往登录',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    wx.switchTab({
                      url: '../setting/setting',
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')

                  }
                }
              })
            } catch (e) {
              // Do something when catch error
              util.showBusy('等待');
            }
    
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
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    var that = this;
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
        var userInfo = JSON.parse(res.data.userdata[0].user_info)
        var userInfonow = wx.getStorageSync('userInfo');
        that.setData({
          avatarUrl: userInfo.avatarUrl,
          name: userInfo.nickName,
        })
        if (res.data.success) {
          var utl = res.data.data

          var mes = res.data.data1
          console.log(mes)
          var mess = []
          if (mes)
            for (var i = 0; i < mes.length; i++) {
              if (mes[i].message) {
                var messa = {
                  nickName: '', avatarUrl: '', message: '', showdelete: 'none', openId: '', showreply: 'none', replymessage: ''
                }

                messa.nickName = utl[i].nickName
                messa.avatarUrl = utl[i].avatarUrl

                messa.message = mes[i].message
                messa.openId = utl[i].openId
                if (mes[i].replymessage) {
                  messa.showreply = '';
                  messa.replymessage = mes[i].replymessage;
                }
                if (utl[i].openId == userInfonow.openId) {
                  messa.showdelete = '';

                }

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
  deletemessage: function () {
    var that = this;
    var userInfonow = wx.getStorageSync('userInfo');
    wx.showModal({
      title: '提示',
      content: '是否删除留言？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: config.service.updatedataUrl,
            data: {
              open_id: that.data.open_id,
              create_time: that.data.create_time,
              openidview: userInfonow.openId,
              message: '',
              deletemessage: 0
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
                    console.log(res);
                    var userInfo = JSON.parse(res.data.userdata[0].user_info)

                    that.setData({
                      avatarUrl: userInfo.avatarUrl,
                      name: userInfo.nickName,
                    })
                    if (res.data.success) {
                      var utl = res.data.data
                      var mes = res.data.data1
                      console.log(mes)
                      var mess = []
                      if (mes)
                        for (var i = 0; i < mes.length; i++) {
                          if (mes[i].message) {
                            var messa = {
                              nickName: '', avatarUrl: '', message: '', showdelete: 'none', openId: '', showreply: 'none', replymessage: ''
                            }

                            messa.nickName = utl[i].nickName
                            messa.avatarUrl = utl[i].avatarUrl

                            messa.message = mes[i].message
                            messa.openId = utl[i].openId
                            if (mes[i].replymessage) {
                              messa.showreply = '';
                              messa.replymessage = mes[i].replymessage;
                            }
                            if (utl[i].openId == userInfonow.openId) {
                              messa.showdelete = '';

                            }

                            mess.push(messa)
                          }

                        }
                      that.setData({
                        avatarUrls: utl,
                        num: utl.length,
                        messag: mess
                      })
                      wx.showToast({
                        title: '删除成功',
                        icon: 'success',
                        duration: 1000,
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
              }
              else {
                wx.showToast({
                  title: '删除失败',
                  icon: 'none',
                  duration: 1000,
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
        } else if (res.cancel) {
          console.log('用户点击取消')

        }
      }
    })
  
  },
  /**
   * 用户点击右上角分享
   */

  addSchedule:function(){
    var that = this;

    var userInfo = wx.getStorageSync('userInfo');
    if(that.data.open_id==userInfo.openId)
    {
    
      wx.showToast({
        title: '自己创建的哦！',
        icon: 'success',
        duration: 1000,
        success: function (res) {
          setTimeout(function () {
            wx.navigateTo({
              url: '../detail/detail?textarea1=' + that.data.textarea1 + '&times=' + that.data.times + '&taskes1=' + that.data.taskes + '&place=' + that.data.textarea + '&content=' + that.data.textarea2 + '&open_id=' + that.data.open_id + '&create_time=' + that.data.create_time,
            })
          }, 1000);
          

        }
      })

      
    }
    else
    {
      var create_time = util.formatTime(new Date());
      wx.request({
        url: config.service.adddataUrl,
        data: {
          open_id: userInfo.openId,
          topic: this.data.textarea1,
          task_date: this.data.times,
          task_place: this.data.textarea,
          task_item: this.data.taskes,
          task_content: this.data.textarea2,
          create_time: create_time,
          share_open_id: this.data.open_id,
          share_create_time: this.data.create_time,
          orcreate: 0
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
          // "Accept": "application/json"
        },


        success: function (res) {
          //  that.setData({ textdata: res.data });
          console.log(res.data);
          if (res.data.success) {
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 2000,
              success: function (res) {
                console.log('s', res)
                wx.switchTab({
                  url: '/pages/schedule/schedule'
                })

              }
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
    }
    
  },
  writemessage: function () {
    wx.navigateTo({
      url: '../write/write?open_id=' + this.data.open_id + '&create_time=' + this.data.create_time,
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
      for (var i = 0; i < 60; i += 5) {
        minute.push(i);
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }
      // 分
      for (var i = minuteIndex; i < 60; i += 5) {
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
    for (var i = 0; i < 60; i += 5) {
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
    for (var i = 0; i < 60; i += 5) {
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
      day = date1.getDate();
      monthDay = (date1.getMonth() + 1) + "月" + date1.getDate() + "日";

    } else {
      month = monthDay.split("-")[0]; // 返回月
      day = monthDay.split("-")[1]; // 返回日
      monthDay = month + "月" + day + "日";
    }
    if(typeof(hours)=='undefined')
    {
      hours=0;
      console.log(1230);
    }
    var startDate = monthDay + " " + hours + ":" + minute;
    console.log(startDate, month, day, hours, minute)
    var strtime = date.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + minute + ':00:00';
    console.log(strtime)
    var remind = new Date(strtime);
    //传入一个时间格式，如果不传入就是获取现在的时间了，这样做不兼容火狐。
    // 可以这样做
    //var date = new Date(strtime.replace(/-/g, '/'));
    console.log(remind.getTime())

    that.setData({
      startDate: startDate
    })
    var userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo)
    wx.request({
      url: config.service.insert_remindUrl,
      data:
        {
      
        open_id: userInfo.openId,
        form_id: this.data.form_id,
        remind_time: remind.getTime(),
        key1: this.data.textarea1,
        key2: this.data.times,
        key3: this.data.textarea,
        key4: this.data.textarea2,
        key5: this.data.name,
        creater_open_id: this.data.open_id,
        creater_create_time: this.data.create_time,
        },
      method: 'GET',
      header: {
        "Accept": "application/json"
      },
      success: function (res) {

        console.log("jianjie", res)
        if (res.data.success) {
          util.showSuccess('添加成功')
          wx.navigateTo({
            url: '../remind/remind',
          })
        }
      },
      fail: function (err) {
        console.log('request fail ', err);
        util.showModel('添加失败', err.message)
      },
      complete: function (res) {
        console.log("request completed!");
      }

    });
  
  },
  testSubmit: function (e) {
    console.log(e)
    this.setData({
      form_id: e.detail.formId
    })
  },
})