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
    textarea1: '请输入活动主题',
    textarea2: '       请输入活动具体内容 ',
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
      { name: '9', value: '班会1' },
      { name: '10', value: '例会1' },
      { name: '11', value: '会议1' },
      { name: '12', value: '团日1' },
      { name: '13', value: '聚会1' },
      { name: '14', value: '出游1' },
      { name: '15', value: '形教课1' },
      { name: '16', value: '学习1' },

    ],
    selected: [],
    tasknum: 0,


    hidden: false
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
    // wx.request({
    //   url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxb648d10457bb1a9f&secret=cd73a8a55866339f7047e578b4d2f7c5',
      
    //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   header: {
    //     //"Content-Type": "application/x-www-form-urlencoded"
    //     "Accept": "application/json"
    //   },
    //   success: function (res) {
    //     console.log(res);
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
  checkboxChange: function (e) {
    var checked = e.detail.value;
    // for(var i=0;i<checked.length;i++)
    // {
    //   this.data.taskes1[checked[i]-1]='1';
    // }
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
    // console.log(this.data.year,this.data.month);
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;
    arr[e.detail.column] = e.detail.value;
    // console.log(e.detail.value);
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
      //  ?textarea1=' + this.data.textarea1 + '&year=' + this.data.year1 + '&month=' + this.data.month1           + '&day=' + this.data.day1 + '&hour=' + this.data.hour1 + '&minute=' + this.data.minute1 + '&               taskes1=' + JSON.stringify(this.data.taskes1) + '&place=' + this.data.textarea+'&content='                     +  this.data.textarea2,

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
    // var self = this;
    // let _access_token = "12_cJpnIV9lqjSfh5JmzcAP3x3yDp-A1keOcltzcqn1vla-jA9P3vwJC9HFrE37sPHBp74FQkkOPYgAt65vCdH76ParEYwYW-tssf78QtOUIt3rayAOS2ui5vUw6PahFYkHY_aWjBpa9L6QWuz1UIAaACAZNF";
    // let url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + _access_token; 
    // let _jsonData = {
    //     access_token: _access_token,
    //   touser: "oufME0Y8Na0e-6uXLmmLfxJVK8Xo",
    //   template_id: 'NUexdR5OZ48w7H2P1vlcVEu4oE96WMmv06vR-Dpcofw',
    //     form_id: e.detail.formId,
    //   page: "pages/schedule/schedule",
    //     data: {
    //       "keyword1": { "value": this.data.textarea1, "color": "#173177" },
    //       "keyword2": { "value": this.data.textareatime, "color": "#173177" },
    //       "keyword3": { "value": this.data.textarea, "color": "#173177" },
    //       "keyword4": { "value": "测试数据四", "color": "#173177" },
    //       "keyword5": { "value": "测试数据一", "color": "#173177" },
    //       "keyword6": { "value": "测试数据二", "color": "#173177" },
    //       "keyword7": { "value": this.data.textarea2, "color": "#173177" },
         
    //     }
    //   }
  
    console.log('20' + this.data.year1 + '-' + this.data.month1 + '-' + this.data.day1)
    var userInfo = wx.getStorageSync('userInfo');
    var create_time = util.formatTime(new Date());
    // wx.request({
    //   url: 'http://127.0.0.1:8000/adddata/',
    //   data: {
    //     'open_id': userInfo.openId,
    //     'topic': this.data.textarea1,
    //     'task_date': this.data.textareatime,
    //     'task_place': this.data.textarea,
    //     'task_item': this.data.taskes,
    //     'task_content': this.data.textarea2,
    //     'create_time': create_time
    //   },
    //   method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },


    //   success: function (res) {
    //     //  that.setData({ textdata: res.data });
    //     console.log(res.data);
    //   },
    //   fail: function () {
    //     // fail
    //     console.log("fail")
    //   },
    //   complete: function () {
    //     // complete
    //   }
    // })
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
      // header: {}, // 设置请求的 header
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
        // "Accept": "application/json"
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
    wx.navigateTo(
      {
        url: '../taskes/taskes?textarea1=' + this.data.textarea1 + '&times=' + this.data.textareatime + '&taskes1=' + this.data.taskes + '&place=' + this.data.textarea + '&content=' + this.data.textarea2 + '&open_id=' + userInfo.openId + '&create_time=' + create_time,
      });


      // wx.request({
      //   url: url,
      //   data: _jsonData,
      //   method: 'POST',
      //   success: function (res) {
      //     console.log(res)
      //   },
      //   fail: function (err) {
      //     console.log('request fail ', err);
      //   },
      //   complete: function (res) {
      //     console.log("request completed!");
      //   }

      // })
 
  }
})