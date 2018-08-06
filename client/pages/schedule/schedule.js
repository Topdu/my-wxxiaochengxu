// pages/schedule/schedule.js
// pages/today/today.js

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
    tabs: ["收到的", "创建的"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    show:true,
    i:2,
    ii:2,
    count:0,
    unlogin:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    const asd = 'sdasd';
    var message = [];
    var mes={};
    mes[asd]=asd
    message.push(mes)
   
    console.log(JSON.stringify(message))
    console.log(JSON.parse(JSON.stringify(message)))
    var userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo.openId)
    if (!userInfo.openId)
    {
      that.setData({
        unlogin: true
      })
      wx.showModal({
        title: '登录',
        content: '您还未登录，是否登录？',
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
    if(that.data.show)
    {
      wx.request({

        url: config.service.getdataUrl,
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
          console.log(res.data.data);
          // res = JSON.parse(res.data.data)
           console.log(res);
          console.log(res.data.data.length)
          if (!res.data.data.length && that.data.count == 0&&!that.data.unlogin) {
            wx.showModal({
              title: '提示',
              content: '您还未收到日程安排！点击确定进行创建！',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  that.setData({
                    count: 1
                  })
                  wx.navigateTo({
                    url: '../create/create',
                  })

                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })

          }

          wx.request({
            url: config.service.getcreatedataUrl,
            data: {
              open_id: userInfo.openId,
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            header: {
              "Accept": "application/json"
            },

            success: function (res) {
              console.log(res.data.data);


              that.setData({
                getcreatedata: res.data.data
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
          var geta=[];
          for(var i=0;i<res.data.data.length;i++)
          {
            geta.push(res.data.data[i][0])
          }
          that.setData({

            getdata: geta,
            getdata2: geta,
            show: true,
            sliderOffset: 0,
            sliderLeft: 0,
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
    else
    {
      wx.request({

        url: config.service.getcreatedataUrl,
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
          console.log(res.data.data);
          // res = JSON.parse(res.data.data)
          // console.log(res);
          wx.request({
            url: config.service.getdataUrl,
            data: {
              open_id: userInfo.openId,
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            header: {
              "Accept": "application/json"
            },

            success: function (res) {
              console.log(res.data.data);
              var geta = [];
              for (var i = 0; i < res.data.data.length; i++) {
                geta.push(res.data.data[i][0])
              }
              that.setData({

                getdata: geta,
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
          that.setData({
            getcreatedata: res.data.data,
            getdata2: res.data.data,
           
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
    return {
      title: '我的时间计划表',
      path: '',
      success: function (res) {
        // 转发成功
        console.log(res)
      },
      fail: function (res) {
        // 转发失败
        console.log(res)
      }
    }
  },

  addTemplate: function () {
    var that = this;
    var temNames = ['发布通知'];
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
  cliked: function () {
    var that=this
    wx.navigateTo({
      url: '../index/index',
    })
    // wx.request({
    //   url: 'http://127.0.0.1:8000/adddata/',
    //   data: {
    //     'open_id':'微信',
    //     'topic':'开会',
    //     'task_date':'七月',
    //     'task_place':'九教',
    //     'task_content':'明天北京交通',
    //     'task_item': '明天北京交通',
    //     'create_time': "今天"
    //   },
    //   method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },

    //   success: function (res) {
    //     //  that.setData({ textdata: res.data });
    //     console.log(res.data);
    //     // res = JSON.parse(res.data.data)
    //     // console.log(res);
    //     that.setData({
    //       getdata2: res.data
    //     })

    //   },
    //   fail: function () {
    //     // fail
    //     console.log("fail")
    //   },
    //   complete: function () {
    //     // complete
    //   }
    // })



  },
  cliked1: function () {
    var that = this
    var userInfo = wx.getStorageSync('userInfo');
    wx.request({
      url: 'http://127.0.0.1:8000/getdata/',
      data: {
        'open_id': userInfo.openId,
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: {
        "Accept": "application/json"
      },

      success: function (res) {
        //  that.setData({ textdata: res.data });
        console.log(res.data);
        // res = JSON.parse(res.data.data)
        // console.log(res);
        that.setData({
          getdata2: res.data
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
    if (that.data.show && that.data.activeIndex==0)
    {
      wx.navigateTo({
        url: '../sharedetail/sharedetail?textarea1=' + that.data.getdata2[that.data.id]['topic'] + '&times=' + that.data.getdata2[that.data.id]['task_date'] + '&taskes1=' + that.data.getdata2[that.data.id]['task_item'] + '&place=' + that.data.getdata2[that.data.id]['task_place'] + '&content=' + that.data.getdata2[that.data.id]['task_content'] + '&open_id=' + that.data.getdata2[that.data.id]['open_id'] + '&create_time=' + that.data.getdata2[that.data.id]['create_time'],
      })
  
    //       // wx.request({
    //       //   url: 'http://127.0.0.1:8000/deletedata/',
    //       //   data: {
    //       //     'id': id,
    //       //     'open_id': open_id
    //       //   },
    //       //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //       //   // header: {}, // 设置请求的 header
    //       //   header: {
    //       //     "Accept": "application/json"
    //       //   },

    //       //   success: function (res) {
    //       //     //  that.setData({ textdata: res.data });
    //       //     console.log(res.data);
    //       //     // res = JSON.parse(res.data.data)
    //       //     // console.log(res);
    //       //     that.setData({
    //       //       getdata2: res.data
    //       //     })

    //       //   },
    //       //   fail: function () {
    //       //     // fail
    //       //     console.log("fail")
    //       //   },
    //       //   complete: function () {
    //       //     // complete
    //       //   }
    //       // })     
    }
    else
    {
      wx.navigateTo({
        url: '../detail/detail?textarea1=' + that.data.getdata2[that.data.id]['topic'] + '&times=' + that.data.getdata2[that.data.id]['task_date'] + '&taskes1=' + that.data.getdata2[that.data.id]['task_item'] + '&place=' + that.data.getdata2[that.data.id]['task_place'] + '&content=' + that.data.getdata2[that.data.id]['task_content'] + '&open_id=' + that.data.getdata2[that.data.id]['open_id'] + '&create_time=' + that.data.getdata2[that.data.id]['create_time'],
      })
    }
  },
  delect: function (res)
  {
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

    console.log(this.data.getdata2)
    wx.showModal({
      title: '详情',
      cancelText: '删除',
      confirmText: '取消',
      content: this.data.getdata2[res.currentTarget.id]['topic'] + "\n时间：" + this.data.getdata2[res.currentTarget.id]['task_date'] + "\n地点：" + this.data.getdata2[res.currentTarget.id]['task_place'] + "\n内容：" + this.data.getdata2[res.currentTarget.id]['task_content'],
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          
           


        } else if (res.cancel) {
          console.log('用户点击取消')
          var orcreate = 0;
          if (that.data.show)
            orcreate = 0;
          else
            orcreate = 1;

          wx.request({
            url: config.service.deletedataUrl,
            data: {
              id: id,
              open_id: open_id,
              orcreate: orcreate,
              create_time: create_time
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
              if (orcreate == 1) {
                that.setData({
                  getdata2: res.data.data,
                  getcreatedata: res.data.data
                })
              }
              else {
                var geta = [];
                for (var i = 0; i < res.data.data.length; i++) {
                  geta.push(res.data.data[i][0])
                }
                that.setData({
                  getdata: geta,
                  getdata2: geta,
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
      }
    })
   

   
  },
  tabClick: function (e) {
    var that = this
    
  
    var userInfo = wx.getStorageSync('userInfo');
    that.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    })
    console.log(e.currentTarget.id)
    if (e.currentTarget.id==1)
    {
      if (that.data.getcreatedata.length==0&&that.data.count==0)
      {
        wx.showModal({
          title: '提示',
          content: '您还为创建日程安排！点击确定进行创建！',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.setData({
                show: false,
                getdata2: that.data.getcreatedata,
                count:1

              })
              wx.navigateTo({
                url: '../create/create',
              })

            } else if (res.cancel) {
              console.log('用户点击取消')
              that.setData({
                show: false,
                getdata2: that.data.getcreatedata,
                count: 1

              })
            }
          }
        })
        
      }
      that.setData({
        show: false,
        getdata2: that.data.getcreatedata

      })
    }
    if (e.currentTarget.id == 0) {
      console.log(that.data.getdata.length)
      
      that.setData({
        show: true,
        getdata2: that.data.getdata
      })
   
      
    
      
    }
  },
  
})