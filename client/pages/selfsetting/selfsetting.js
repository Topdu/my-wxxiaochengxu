// pages/components/introduce/introduce.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    setcheckboxItems: [
      { name: '1', value: '班会' },
      { name: '2', value: '例会' },
      { name: '3', value: '会议' },
      { name: '4', value: '团日' },
      { name: '5', value: '聚会' },
      { name: '6', value: '出游' },
      { name: '7', value: '形教课' },
      { name: '8', value: '学习' },
      { name: '9', value: '约会' },
      { name: '10', value: '团建' },
      { name: '11', value: '运动' },
      { name: '12', value: '工作' },
  

    ],
    taskes1: [],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var setselected = wx.getStorageSync('items_num');
    
    for (var i = 0; i < setselected.length; i++) {
      that.data.setcheckboxItems[setselected[i] - 1].checked
 = true;
    }
    console.log(that.data.setcheckboxItems)
    that.setData({
      setcheckboxItems1: that.data.setcheckboxItems

    })

  },
  setcheckboxChange: function (e) {
    var setchecked = e.detail.value;
    console.log(setchecked);
    if(setchecked.length>8)
    {
      wx.showModal({
        title: '提示',
        content: '标签至多设置8个，您可以添加自定义设置！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
         
             return 0;
            
          } else if (res.cancel) {
            return 0;

          }
        }
      })
    }
    else
    {

    
    wx.setStorage({
      key: 'items_num',
      data: setchecked,
    });
    var setchanges = {};
    var j = 0;
    // if(setchecked.length<=8)
    {
      for (var i = 0; i < this.data.setcheckboxItems1.length; i++) {
        if (setchecked
  .indexOf(this.data.setcheckboxItems[i].name) !== -1) {
          setchanges['setcheckboxItems1[' + i + '].checked'] = true;
          console.log('this.data.setcheckboxItems1[i].value' + this.data.setcheckboxItems1[i].value);
          this.data.taskes1[j] = this.data.setcheckboxItems1[i].value;
          j++;

          console.log(this.data.taskes1)
          // this.setData({
          //   taskes: this.data.taskes + ' ' + this.data.setcheckboxItems[i].value
          // });
        } else {
          setchanges['setcheckboxItems1[' + i + '].checked'] = false;

        }
        console.log('setcheckboxItems1=' + i + '=' + this.data.setcheckboxItems1[i].checked
  );
      }
     
    }

    this.setData(setchanges)
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
  backHome: function () {
    wx.switchTab({
      url: '../../setting/setting'
    })
  }
})