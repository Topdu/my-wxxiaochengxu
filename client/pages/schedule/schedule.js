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
    tabs: [{ name: "收到栏", url: 'http://haowutbquan.cn:8889/image/shoujianxiangnoon.png' }, { name: "发布栏", url: 'http://haowutbquan.cn:8889/image/bianjinoon.png'}],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    show:true,
    i:2,
    ii:2,
    count:0,
    unlogin:false,
    url:'',
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
    

    if (userInfo.openId) {
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
          if (!res.data.success) {

        
            try {
              wx.removeStorageSync('userInfo');
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
              content: '无活动通知！点击确定进行创建！',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  that.setData({
                    count: 1
                  })
                  var temNames = ['模板输入', '语音输入', '图片输入'];

                  wx.showActionSheet({
                    itemList: temNames,
                    success: function (res) {
                      if (res.tapIndex == 0) {
                        wx.navigateTo({
                          url: '../create/create?tapIndex=' + res.tapIndex
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
        
         for (var i = 0; i < geta.length; i++) {
           if(geta[i])
            if (geta[i].ordelete == 1) {
              geta[i].color = '#cccccc';
          }
          }
          console.log(geta);
          that.setData({
            tabs: [{ name: "收到栏", url: 'http://haowutbquan.cn:8889/image/shoujianxiangon.png' }, { name: "发布栏", url: 'http://haowutbquan.cn:8889/image/bianjinoon.png' }],
            imgurl:'http://haowutbquan.cn:8889/image/shoujianxiang.png',
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
            tabs: [{ name: "收到栏", url: 'http://haowutbquan.cn:8889/image/shoujianxiangnoon.png' }, { name: "发布栏", url: 'http://haowutbquan.cn:8889/image/bianjion.png' }],
            getcreatedata: res.data.data,
            getdata2: res.data.data,
            imgurl: 'http://haowutbquan.cn:8889/image/bianji.png',
           
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
    var temNames = ['模板输入','语音输入','图片输入'];

    wx.showActionSheet({
      itemList: temNames,
      success: function (res) {
        if (res.tapIndex == 0) {
          wx.navigateTo({
            url: '../create/create?tapIndex=' + res.tapIndex
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
      if (that.data.getdata2[that.data.id].ordelete==1)
      {
        wx.showModal({
          title: '提示',
          content: '该通知已被创建者删除',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            
            } else if (res.cancel) {
              console.log('用户点击取消')

            }
          }
        })
      }
      else
      {
        if (that.data.getdata2[that.data.id]['task_date']==null)
        {
          wx.navigateTo(
            {
              url: '../sharedetail/sharedetail?content=' + this.data.getdata2[that.data.id]['task_content'] + '&open_id=' + that.data.getdata2[that.data.id]['open_id'] + '&create_time=' + that.data.getdata2[that.data.id]['create_time'] + '&tuxiang=' + 1 + '&textarea1=' + that.data.getdata2[that.data.id]['topic'],
            });
        }
        else
        {
          wx.navigateTo({
            url: '../sharedetail/sharedetail?textarea1=' + that.data.getdata2[that.data.id]['topic'] + '&times=' + that.data.getdata2[that.data.id]['task_date'] + '&taskes1=' + that.data.getdata2[that.data.id]['task_item'] + '&place=' + that.data.getdata2[that.data.id]['task_place'] + '&content=' + that.data.getdata2[that.data.id]['task_content'] + '&open_id=' + that.data.getdata2[that.data.id]['open_id'] + '&create_time=' + that.data.getdata2[that.data.id]['create_time'],
          })
        }

      }
    }
    else
    {
      if (that.data.getdata2[that.data.id]['task_date'] == null) 
      {
        wx.navigateTo(
          {
            url: '../detail/detail?content=' + this.data.getdata2[that.data.id]['task_content'] + '&open_id=' + that.data.getdata2[that.data.id]['open_id'] + '&create_time=' + that.data.getdata2[that.data.id]['create_time'] + '&tuxiang=' + 1 + '&textarea1=' + that.data.getdata2[that.data.id]['topic'],
          });
      }
      else
      {
        wx.navigateTo({
          url: '../detail/detail?textarea1=' + that.data.getdata2[that.data.id]['topic'] + '&times=' + that.data.getdata2[that.data.id]['task_date'] + '&taskes1=' + that.data.getdata2[that.data.id]['task_item'] + '&place=' + that.data.getdata2[that.data.id]['task_place'] + '&content=' + that.data.getdata2[that.data.id]['task_content'] + '&open_id=' + that.data.getdata2[that.data.id]['open_id'] + '&create_time=' + that.data.getdata2[that.data.id]['create_time'],
        })
      }

     
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
          var userInfo = wx.getStorageSync('userInfo');
          wx.request({
            url: config.service.deletedataUrl,
            data: {
              id: id,
              open_id: userInfo.openId,
              share_open_id: open_id,
              orcreate: orcreate,
              share_create_time: create_time
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
              if(res.data.success)
              {
                
                util.showSuccess("删除成功")
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
                  var setdata = geta
                  for (var i = 0; i < setdata.length; i++) {
                    if (setdata[i])
                      if (setdata[i].ordelete == 1) {
                        setdata[i].color = '#cccccc';

                      }
                  }
                  that.setData({
                    getdata: setdata,
                    getdata2: setdata,
                  })
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
          content: '无活动通知！点击确定进行创建！',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.setData({
                show: false,
                getdata2: that.data.getcreatedata,
                count: 1

              })
              var temNames = ['模板输入', '语音输入', '图片输入'];

              wx.showActionSheet({
                itemList: temNames,
                success: function (res) {
                  if (res.tapIndex == 0) {
                    wx.navigateTo({
                      url: '../create/create?tapIndex=' + res.tapIndex
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
        tabs: [{ name: "收到栏", url: 'http://haowutbquan.cn:8889/image/shoujianxiangnoon.png' }, { name: "发布栏", url: 'http://haowutbquan.cn:8889/image/bianjion.png' }],
        show: false,
        getdata2: that.data.getcreatedata,
        imgurl: 'http://haowutbquan.cn:8889/image/bianji.png' 

      })
    }
    if (e.currentTarget.id == 0) {
      console.log(that.data.getdata.length)
      var setdata = that.data.getdata
      for (var i = 0; i < setdata.length;i++)
      {
        if (setdata[i])
        if(setdata[i].ordelete==1)
        {
          setdata[i].color='#cccccc';
        
        }
      }
      that.setData({
        tabs: [{ name: "收到栏", url: 'http://haowutbquan.cn:8889/image/shoujianxiangon.png' }, { name: "发布栏", url: 'http://haowutbquan.cn:8889/image/bianjinoon.png' }],
        show: true,
        getdata2: setdata,
        imgurl: 'http://haowutbquan.cn:8889/image/shoujianxiang.png' 
      })
   
      
    
      
    }
  },
  
})