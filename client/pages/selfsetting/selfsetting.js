// pages/components/introduce/introduce.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    checkboxItems: [
      { name: '1', value: '班会' },
      { name: '2', value: '例会' },
      { name: '3', value: '会议' },
      { name: '4', value: '团日' },
      { name: '5', value: '聚会' },
      { name: '6', value: '出游' },
      { name: '7', value: '形教课' },
      { name: '8', value: '学习' },
      { name: '9', value: '班会1' },
      { name: '10', value: '例会1' },
      { name: '11', value: '会议1' },
      { name: '12', value: '团日1' },
      { name: '13', value: '聚会1' },
      { name: '14', value: '出游1' },
      { name: '15', value: '形教课1' },
      { name: '16', value: '学习1' },

    ],
    taskes1: [],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var selected = wx.getStorageSync('items_num');
    
    for (var i = 0; i < selected.length; i++) {
      that.data.checkboxItems[selected[i] - 1].checked = true;
    }
    console.log(that.data.checkboxItems)
    that.setData({
      checkboxItems1: that.data.checkboxItems

    })

  },
  checkboxChange: function (e) {
    var checked = e.detail.value;
    console.log(checked);
    wx.setStorage({
      key: 'items_num',
      data: checked,
    });
    var changed = {};
    var j = 0;
    // if(checked.length<=8)
    {
      for (var i = 0; i < this.data.checkboxItems1.length; i++) {
        if (checked.indexOf(this.data.checkboxItems[i].name) !== -1) {
          changed['checkboxItems1[' + i + '].checked'] = true;
          console.log('this.data.checkboxItems1[i].value' + this.data.checkboxItems1[i].value);
          this.data.taskes1[j] = this.data.checkboxItems1[i].value;
          j++;

          console.log(this.data.taskes1)
          // this.setData({
          //   taskes: this.data.taskes + ' ' + this.data.checkboxItems[i].value
          // });
        } else {
          changed['checkboxItems1[' + i + '].checked'] = false;

        }
        console.log('checkboxItems1=' + i + '=' + this.data.checkboxItems1[i].checked);
      }
      // console.log('this.data.taskes' + this.data.taskes);
    }
    // // else
    // // {
    //   wx.showModal({
    //     title: '提示',
    //     content: '最多选择8个标签！',
    //     success: function (res) {
    //       if (res.confirm) {
    //         console.log('用户点击确定')
    //       } else if (res.cancel) {
    //         console.log('用户点击取消')
    //       }
    //     }
    //   })
    // // }

    this.setData(changed)
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