// pages/components/template/template.js

var dateTimePicker = require('../../utils/dateTimePicker.js');
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
const tiems1 = []
for (let i = 0; i < 8; i++) {
  tiems1.push(0)
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // years: years,
    year1: null,
    // months: months,
    month1: null,
    // days: days,
    day1: null,
    // hours: hours,
    hour1: null,
    // minutes: minutes,
    minute1: null,
    year: '',
    // months: months,
    month: '',
    // days: days,
    day: '',
    // hours: hours,
    hour: '',
    // minutes: minutes,
    minute: '',
    i: 1,
    keys: '',
    keys1: '',
    textarea: '地点',
    textarea1: '编辑主题（最多12个字）',
    textarea2: '编辑具体内容 ',
    textareatime:'开始时间--结束时间',
    temNames: ['查看我的日程'],
    // year: date.getFullYear(),

    // value: [date.getFullYear(), date.getMonth() , date.getDate() - 1, date.getHours() , date.getMinutes()],
    Sring: "asdasasda",
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,


    taskes: '未选择',
    // taskes1:['0','0','0','0','0','0','0','0'],
    checkboxItems: [
      { name: '1', value: '班会' },
      { name: '2', value: '例会' },
      { name: '3', value: '会议' },
      { name: '4', value: '团日' },
      { name: '5', value: '聚会' },
      { name: '6', value: '出游' },
      { name: '7', value: '形教课' },
      { name: '8', value: '学习' },

    ],
    checkboxItems2: [
      { name: '1', value: '班会' },
      { name: '2', value: '例会' },
      { name: '3', value: '会议' },
      { name: '4', value: '团日' },
      { name: '5', value: '聚会' },
      { name: '6', value: '出游' },
      { name: '7', value: '形教课' },
      { name: '8', value: '学习' },

    ],
    checkboxItems3: [
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
    selected: [],
    tasknum: 0,
    taskes1: [],

    hidden: false,
    showsetitems:'none',
    showbtn:'',
    showbtn1:'none',
  },
  onLoad: function (options) {
    var that = this;
    console.log(options)
    if(options.create_time)
    {
      that.setData({
        textarea1: options.textarea1,
        textareatime: options.times,
        textarea: options.place,
        textarea2: options.content,
        //taskes: options.taskes1,
       // open_id: options.open_id,
       // create_time: options.create_time
      })
    }

    that.data.selected = wx.getStorageSync('items_num');
    console.log('1=' + that.data.selected);
    for (var i = 0; i < that.data.selected.length; i++) {
      that.data.checkboxItems2[i].value = that.data.checkboxItems3[that.data.selected[i] - 1].value;
    }
    that.setData({
      checkboxItems: that.data.checkboxItems2
    });

    console.log(this.data.checkboxItems);


    {
      var obj = dateTimePicker.dateTimePicker(that.data.startYear, that.data.endYear);
      var obj1 = dateTimePicker.dateTimePicker(that.data.startYear, that.data.endYear);
      // 精确到分的处理，将数组的秒去掉
      var lastArray = obj1.dateTimeArray.pop();
      var lastTime = obj1.dateTime.pop();

      that.setData
        ({
          dateTime: obj.dateTime,
          dateTimeArray: obj.dateTimeArray,
          dateTimeArray1: obj1.dateTimeArray,
          dateTime1: obj1.dateTime
        });
    }
    console.log(util.formatTime(new Date()))
  },
  onShow: function () {

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


    that.data.selected = wx.getStorageSync('items_num');
    console.log('1=' + that.data.selected);
    for (var i = 0; i < that.data.selected.length; i++) {
      that.data.checkboxItems2[i].value = that.data.checkboxItems3[that.data.selected[i] - 1].value;
    }
    that.setData({
      checkboxItems: that.data.checkboxItems2
    });

    console.log(this.data.checkboxItems);


    {
      var obj = dateTimePicker.dateTimePicker(that.data.startYear, that.data.endYear);
      var obj1 = dateTimePicker.dateTimePicker(that.data.startYear, that.data.endYear);
      // 精确到分的处理，将数组的秒去掉
      var lastArray = obj1.dateTimeArray.pop();
      var lastTime = obj1.dateTime.pop();

      that.setData
        ({
          dateTime: obj.dateTime,
          dateTimeArray: obj.dateTimeArray,
          dateTimeArray1: obj1.dateTimeArray,
          dateTime1: obj1.dateTime
        });
    }
  },
  checkboxChange: function (e) {
    var checked = e.detail.value;
    this.data.taskes = ' '
    console.log(checked)
    var changed = {}
    for (var i = 0; i < this.data.checkboxItems.length; i++) {
      if (checked.indexOf(this.data.checkboxItems[i].name) !== -1) {
        changed['checkboxItems[' + i + '].checked'] = true;
        console.log('this.data.checkboxItems[i].value' + this.data.checkboxItems[i].value);
        this.setData({
          taskes: this.data.taskes + ' ' + this.data.checkboxItems[i].value
        });
      } else {
        changed['checkboxItems[' + i + '].checked'] = false;

      }
      console.log('checkboxItems=' + i + '=' + this.data.checkboxItems[i].checked);
    }
    console.log('this.data.taskes' + this.data.taskes)

    this.setData(changed)
  },
  setcheckboxChange: function (e) {
    var that=this;
    var setchecked = e.detail.value;
    console.log(setchecked);
    if (setchecked.length > 8) {
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
    else {


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
    that.data.selected = wx.getStorageSync('items_num');
    console.log('1=' + that.data.selected);
    for (var i = 0; i < that.data.selected.length; i++) {
      that.data.checkboxItems2[i].value = that.data.checkboxItems3[that.data.selected[i] - 1].value;
    }
    that.setData({
      checkboxItems: that.data.checkboxItems2
    });

    console.log(this.data.checkboxItems);
  },
  bindTime: function (e) {
    this.setData({
      textareatime: e.detail.value
    })
  },
  bindInput1: function (e) {
    this.setData({
      textarea: e.detail.value
    })
  },
  bindTextAreaBlur1: function (e) {
    this.setData({
      textarea1: e.detail.value
    })
    // console.log(e.detail.value)
  },
  bindTextAreaBlur2: function (e) {
    console.log(e.detail.value)
    this.setData({
      textarea2: e.detail.value
    })
    // console.log(e.detail.value)
  },
  changeDateTime1(e) {
    this.setData({
      dateTime1: e.detail.value,
      year1: e.detail.value[0],
      month1: e.detail.value[1] + 1,
      day1: e.detail.value[2] + 1,
      hour1: e.detail.value[3],
      minute1: e.detail.value[4],
    });
    this.data.keys = '20' + this.data.year1 + '-' + this.data.month1 + '-' + this.data.day1 + ' ' + this.data.hour1 + '时' + this.data.minute1 + '分';
 
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;
    arr[e.detail.column] = e.detail.value;
 
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },
  onShareAppMessage: function (res) {
    console.log(this.data.taskes1, this.data.textarea, this.data.textarea2);
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '这是群公告',
      path: 'pages/components/template/template',
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
  bindOk: function () {
  },
  onHide: function () {
    this.setData({
      isEmpty: false
    })
  },
  outLoading: function () {
    this.setData({
      isEmpty: false
    })
  },
  testSubmit: function (e) {
    console.log(e)
    console.log('20' + this.data.year1 + '-' + this.data.month1 + '-' + this.data.day1)
    var userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo)
    var create_time = util.formatTime(new Date());

    wx.request({
      url: config.service.adddataUrl,
      data: {
        open_id: userInfo.openId,
        topic: this.data.textarea1,
        task_date: this.data.textareatime,
        task_place: this.data.textarea,
        task_item: this.data.taskes,
        task_content: this.data.textarea2,
        create_time: create_time,
        orcreate: 1
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
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
    wx.navigateTo(
      {
        url: '../taskes/taskes?textarea1=' + this.data.textarea1 + '&times=' + this.data.textareatime + '&taskes1=' + this.data.taskes + '&place=' + this.data.textarea + '&content=' + this.data.textarea2 + '&open_id=' + userInfo.openId + '&create_time=' + create_time,
      });
 
  },
 exchangeitems:function(){
   this.setData({
     showsetitems:'',
     showbtn1: '',
     showbtn: 'none',
   })
 },
 showbtn: function () {
    this.setData({
      showbtn: '',
      showbtn1: 'none',
      showsetitems: 'none',
    })
  }
 
})