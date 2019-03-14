// client/pages/trash/trash.js


var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
//const moment = require('moment')
Page({

  /**
   * 页面的初始数据
   */
  data: {

    btnWidth: 310,
    starUrl: '../../image/star.png',
    starHlUrl: '../../image/star_hl.png',
    scrollFlag: false,
    scrollTop: 0,
    title: 'title1',
    alpha: '',
    windowHeight: '',
  
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    show: true,
    i: 2,
    ii: 2,
    count: 0,
    unlogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
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

    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
   
     {
      wx.request({

        url: config.service.getcreatedataUrl,
        data: {
          open_id: userInfo.openId,
          trash:1
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        header: {
          //'content-type': 'application/x-www-form-urlencoded'
          "Accept": "application/json"
        },

        success: function (res) {
          //  that.setData({ textdata: res.data });
          console.log(res.data.data);
          // res = JSON.parse(res.data.data)
          // console.log(res);
      
              var data1 = res.data.data;
              for(var i=0 ;i<data1.length;i++)
              {
                if(data1[i].orcreate==0)
                {
                  data1[i].url ='http://haowutbquan.cn:8889/image/shoujianxiang.png'
                  data1[i].show=false
                }
                else
                {
                  data1[i].url = 'http://haowutbquan.cn:8889/image/bianji.png'
                  data1[i].show=true
                }
              }
          that.setData({
           
            getdata2: data1,
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
    var open_id = that.data.getdata2[res.currentTarget.id]['open_id']
    console.log(open_id)
    console.log(id)
    var create_time = that.data.getdata2[res.currentTarget.id]['create_time']

    console.log(this.data.getdata2)
    if (that.data.getdata2[that.data.id]['orcreate']==0) {
      wx.navigateTo({
        url: '../sharedetail/sharedetail?textarea1=' + that.data.getdata2[that.data.id]['topic'] + '&times=' + that.data.getdata2[that.data.id]['task_date'] + '&taskes1=' + that.data.getdata2[that.data.id]['task_item'] + '&place=' + that.data.getdata2[that.data.id]['task_place'] + '&content=' + that.data.getdata2[that.data.id]['task_content'] + '&open_id=' + that.data.getdata2[that.data.id]['share_open_id'] + '&create_time=' + that.data.getdata2[that.data.id]['share_create_time']+'&isdelete='+1,
      })
    }
    else {
      wx.navigateTo({
        url: '../detail/detail?textarea1=' + that.data.getdata2[that.data.id]['topic'] + '&times=' + that.data.getdata2[that.data.id]['task_date'] + '&taskes1=' + that.data.getdata2[that.data.id]['task_item'] + '&place=' + that.data.getdata2[that.data.id]['task_place'] + '&content=' + that.data.getdata2[that.data.id]['task_content'] + '&open_id=' + that.data.getdata2[that.data.id]['open_id'] + '&create_time=' + that.data.getdata2[that.data.id]['create_time']+'&isdelete='+1,
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
    var open_id = that.data.getdata2[res.currentTarget.id]['open_id']
    console.log(open_id)
    console.log(id)
    var create_time = that.data.getdata2[res.currentTarget.id]['create_time']
    var orcreate = this.data.getdata2[res.currentTarget.id]['orcreate'] 
    console.log(this.data.getdata2)
    wx.showModal({
      title: '还原通知',
      cancelText: '取消',
      confirmText: '确定',
      content: this.data.getdata2[res.currentTarget.id]['topic'] + "\n时间：" + this.data.getdata2[res.currentTarget.id]['task_date'] + "\n地点：" + this.data.getdata2[res.currentTarget.id]['task_place'] + "\n内容：" + this.data.getdata2[res.currentTarget.id]['task_content'],
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          
          if (orcreate==1)
            orcreate = 1;
          else
            orcreate = 0;

          wx.request({
            url: config.service.deletedataUrl,
            data: {
              id: id,
              open_id: open_id,
              orcreate: orcreate,
              create_time: create_time,
              nodelete: 1
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            header: {
              // "Accept": "application/json"
              'content-type': 'application/x-www-form-urlencoded'
            },

            success: function (res) {
              //  that.setData({ textdata: res.data });
              console.log(res.data);
              // res = JSON.parse(res.data.data)
              // console.log(res);
              util.showSuccess("移出成功")
              var data1 = res.data.data;
              for (var i = 0; i < data1.length; i++) {
                if (data1[i].orcreate == 0) {
                  data1[i].url = 'http://haowutbquan.cn:8889/image/shoujianxiang.png'
                  data1[i].show = false
                }
                else {
                  data1[i].url = 'http://haowutbquan.cn:8889/image/bianji.png'
                  data1[i].show = true
                }
              }
              that.setData({

                getdata2: data1,
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

        } else if (res.cancel) {
          console.log('用户点击取消')
        
        }
      }
    })
  },


})