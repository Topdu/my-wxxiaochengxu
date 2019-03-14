// client/pages/remind/remind.js

var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
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

    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    if (1) {
   
      wx.request({

        url: config.service.getremindUrl,
        data: {
          open_id: userInfo.openId,
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        header: {
          //'content-type': 'application/x-www-form-urlencoded'
          "Accept": "application/json"
        },

        success: function (res) {
          //  that.setData({ textdata: res.data });
          console.log(res.data);
          // res = JSON.parse(res.data.data)
          // console.log(res);
          var remind_message = res.data.remind_message;
          var or_remind='';
          var data1 = res.data.data;
         
          for (var i = 0; i < remind_message.length; i++)

          {
            if (remind_message[i].or_delete == 1)
              remind_message[i].or_remind = '已取消提醒';
              else
            {
              if (remind_message[i].or_remind == 0) {
                remind_message[i].or_remind = '未发送提醒';
              }
              else {
                remind_message[i].or_remind = '已发送提醒';
              }
             

            }
            if (remind_message[i].open_id == remind_message[i].creater_open_id) {
             
                remind_message[i].url = 'http://haowutbquan.cn:8889/image/bianji.png'
            }
            else {
           
                remind_message[i].url = 'http://haowutbquan.cn:8889/image/shoujianxiang.png'
            }
            var remind_time = parseInt( remind_message[i].remind_time);
           
            var time = new Date(remind_time);
            var y = time.getFullYear();
            var m = time.getMonth() + 1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            remind_message[i].remind_time= y + '-' + (m) + '-' + (d) + ' ' + (h) + ':' + (mm) + ':' + (s);
          }
          console.log(remind_message)
         that.setData({
           getdata2: remind_message,
        
         })
          

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

  deletedata: function (res) {
    console.log(res)
    var that = this;

    var id = that.data.getdata2[res.currentTarget.id].id;
    that.setData(
      {
        id: res.currentTarget.id
      }
    )
    var open_id = that.data.getdata2[res.currentTarget.id]['creater_open_id']
    console.log(open_id)
    console.log(id)
    var create_time = that.data.getdata2[res.currentTarget.id]['creater_create_time']

    console.log(this.data.getdata2)
    if (that.data.getdata2[res.currentTarget.id]['creater_open_id'] == (that.data.getdata2[res.currentTarget.id]['open_id'])) {
      wx.navigateTo({
        url: '../sharedetail/sharedetail?textarea1=' + that.data.getdata2[that.data.id]['key1'] + '&times=' + that.data.getdata2[that.data.id]['key2'] + '&taskes1=' + that.data.getdata2[that.data.id]['key6'] + '&place=' + that.data.getdata2[that.data.id]['key3'] + '&content=' + that.data.getdata2[that.data.id]['key4'] + '&open_id=' + that.data.getdata2[that.data.id]['creater_open_id'] + '&create_time=' + that.data.getdata2[that.data.id]['creater_create_time'],
      })
    }
    else {
      wx.navigateTo({
        url: '../detail/detail?textarea1=' + that.data.getdata2[that.data.id]['key1'] + '&times=' + that.data.getdata2[that.data.id]['key2'] + '&taskes1=' + that.data.getdata2[that.data.id]['key6'] + '&place=' + that.data.getdata2[that.data.id]['key3'] + '&content=' + that.data.getdata2[that.data.id]['key4'] + '&open_id=' + that.data.getdata2[that.data.id]['creater_open_id'] + '&create_time=' + that.data.getdata2[that.data.id]['creater_create_time'],
      })
    }
  },
  delect: function (res) {
    console.log(res)
    var that = this;
    console.log(that.data.getdata2)
    var id = that.data.getdata2[res.currentTarget.id].id;

    that.setData(
      {
        id: res.currentTarget.id
      }
    )

    var open_id = that.data.getdata2[res.currentTarget.id]['creater_open_id']
    console.log(open_id)
    console.log(id)
    var create_time = that.data.getdata2[res.currentTarget.id]['creater_create_time']
    var remind_time = that.data.getdata2[res.currentTarget.id]['remind_time']
    console.log(remind_time)
     remind_time = new Date(remind_time);
  console.log(remind_time.getTime())
    console.log(this.data.getdata2)
    wx.showModal({
      title: '删除提醒',
      cancelText: '确定',
      confirmText: '取消',
      content: this.data.getdata2[res.currentTarget.id]['key1'] + "\n时间：" + this.data.getdata2[res.currentTarget.id]['key2'] + "\n地点：" + this.data.getdata2[res.currentTarget.id]['key3'] + "\n内容：" + this.data.getdata2[res.currentTarget.id]['key4'],
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
          var userInfo = wx.getStorageSync('userInfo');
          wx.request({

            url: config.service.getremindUrl,
            data: {
              id: id,
              open_id: userInfo.openId,
              creater_create_time: create_time,
              creater_open_id:open_id,
              remind_time: remind_time.getTime(),
              deleteremind:1
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            header: {
              //'content-type': 'application/x-www-form-urlencoded'
              "Accept": "application/json"
            },

            success: function (res) {
              //  that.setData({ textdata: res.data });
              console.log(res.data);
              if(res.data.success)
              {
                util.showSuccess('取消成功');
                var userInfo = wx.getStorageSync('userInfo');
                wx.request({

                  url: config.service.getremindUrl,
                  data: {
                    open_id: userInfo.openId,
                  },
                  method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                  // header: {}, // 设置请求的 header
                  header: {
                    //'content-type': 'application/x-www-form-urlencoded'
                    "Accept": "application/json"
                  },

                  success: function (res) {
                    //  that.setData({ textdata: res.data });
                    console.log(res.data);
                    // res = JSON.parse(res.data.data)
                    // console.log(res);
                    var remind_message = res.data.remind_message;
                    var or_remind = '';
                    for (var i = 0; i < remind_message.length; i++) {
                      if (remind_message[i].or_delete == 1)
                        remind_message[i].or_remind = '已取消提醒';
                      else {
                        if (remind_message[i].or_remind == 0) {
                          remind_message[i].or_remind = '未发送提醒';
                        }
                        else {
                          remind_message[i].or_remind = '已发送提醒';
                        }


                      }
                      if (remind_message[i].open_id == remind_message[i].creater_open_id) {
                       
                          remind_message[i].url = 'http://haowutbquan.cn:8889/image/bianji.png'
                      }
                      else {
                     
                          remind_message[i].url = 'http://haowutbquan.cn:8889/image/shoujianxiang.png'
                      }
                      var remind_time = parseInt(remind_message[i].remind_time);

                      var time = new Date(remind_time);
                      var y = time.getFullYear();
                      var m = time.getMonth() + 1;
                      var d = time.getDate();
                      var h = time.getHours();
                      var mm = time.getMinutes();
                      var s = time.getSeconds();
                      remind_message[i].remind_time = y + '-' + (m) + '-' + (d) + ' ' + (h) + ':' + (mm) + ':' + (s);
                    }
                    console.log(remind_message)
                    that.setData({
                      getdata2: remind_message,

                    })


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
              // res = JSON.parse(res.data.data)
              // console.log(res);
          

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
    })



  },
})