//index.js

const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config');
const util = require('../../utils/util');
const dateformat = require('../../utils/dateformat');

// 处理录音逻辑
const recorderManager = wx.getRecorderManager();
const innerAudioContext = wx.createInnerAudioContext();

// 是否有文件正在播放
let isPlayingVoice = false;
// 正在播放的文件名
let playingVoiceKey = '';
// 正在播放的文件索引
let playingVoiceIndex = 0;
Page({
  data: {
    // 身份证识别
    imgUrl: '',
    idCardInfo: {},
    showResult: false,
    notes: [],
    // 印刷体识别
    ocrImgUrl: '',
    ocrResult: [],
    showOcrResult: false,
    textshow: true,
    textarea1:'通知',
    progress: 0,
    disabled: false
  },
  onLoad() {
    // 读取储存着的笔记
    let notes = JSON.parse(wx.getStorageSync('notes') || '[]');

    // 添加播放标记
    notes = notes.map(v => {
      v.playing = false;

      if (v.isRec === true && !v.word) {
        v.isRec = false;
      }

      return v;
    })

    this.setData({ notes });
    recorderManager.onStop(this.onVoiceStop);
    // recorderManager.onFrameRecorded(res => {
    //     const { frameBuffer, isLastFrame } = res
    //     console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    //     this.recognizeVoice({
    //         data: wx.arrayBufferToBase64(frameBuffer),
    //         isLastFrame: isLastFrame
    //     })
    // });
  },
  bindTopic: function (e) {
    this.setData({
      textarea1: e.detail.value
    })
  },
  doWordIndentify: function () {
    var that = this
    var sourceType = ['camera'];
    wx.showActionSheet({
      itemList: ['选择图片', '拍照'],
      success: res => {
        if (res.tapIndex === 0) {
        
            sourceType= ['album'];
          that.setData({
            showOcrResult: false
          })

          // 选择图片和上传图片

          this._chooseImgAndUpload(
            config.service.ciUrl + '?action=general',
            // 上传图片之前
            function (filePath) {
              console.log(filePath);
              that.setData({
                ocrImgUrl: filePath
              })
            },
            // 调用成功
            function (res) {

              util.showSuccess('识别成功')
              var data = JSON.parse(res.data)
              that.setData({
                textshow:false
              })
              console.log(data)
              var orcstr=data.data.data.items;
              var orcstring='    ';
              console.log(orcstr);
              for(var i=0;i<orcstr.length;i++)
              {
                orcstring += orcstr[i].itemstring;
              }
              console.log(orcstring)
              that.setData({
                orcstring: orcstring
              })
              if (data.code !== 0) {
                util.showModel('识别失败')
                return
              }

              var info = data.data

              if (info.code !== 0) {
                util.showModel('识别失败' + info.message)
                return
              }

              that.setData({
                showOcrResult: true,
                ocrResult: info.data.items
              })
            },
            // 调用失败
            function (e) {
              console.log(e)
              util.showModel('识别失败' + e.message)
            },
            sourceType
          )
        
        } else if (res.tapIndex === 1) {

          sourceType = ['camera'];
          that.setData({
            showOcrResult: false
          })

          // 选择图片和上传图片

          this._chooseImgAndUpload(
            config.service.ciUrl + '?action=general',
            // 上传图片之前
            function (filePath) {
              console.log(filePath);
              that.setData({
                ocrImgUrl: filePath
              })
            },
            // 调用成功
            function (res) {

              util.showSuccess('识别成功')
              var data = JSON.parse(res.data)
              that.setData({
                textshow: false
              })
              console.log(data)
              var orcstr = data.data.data.items;
              var orcstring = '    ';
              console.log(orcstr);
              for (var i = 0; i<orcstr.length; i++) {
                orcstring += orcstr[i].itemstring;
              }
              console.log(orcstring)
              that.setData({
                orcstring: orcstring
              })
              if (data.code !== 0) {
                util.showModel('识别失败')
                return
              }

              var info = data.data

              if (info.code !== 0) {
                util.showModel('识别失败' + info.message)
                return
              }

              that.setData({
                showOcrResult: true,
                ocrResult: info.data.items
              })
            },
            // 调用失败
            function (e) {
              console.log(e)
              util.showModel('识别失败' + e.message)
            },
            sourceType
          )

        } 
        
      }
    });
  
  },
  bindContent: function (e) {
    this.setData({
      textarea2: e.detail.value
    })
  },
  addSchedule: function () {

  
    var userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo)
    var create_time = util.formatTime(new Date());

    wx.request({
      url: config.service.adddataUrl,
      data: {
        open_id: userInfo.openId,
        topic: this.data.textarea1,
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
    console.log(this.data.textarea1)
    wx.navigateTo(
      {
        url: '../taskes/taskes?content=' + this.data.textarea2 + '&textarea1='+this.data.textarea1+'&open_id=' + userInfo.openId + '&create_time=' + create_time+'&tuxiang='+1,
      });

  },

  /**
   * 统一封装选择图片和上传图片的 API
   * @param {Function} beforUpload 开始上传图片之前执行的函数
   * @param {Function} success     调用成功时执行的函数
   * @param {Function} fail        调用失败时执行的函数
   */
  _chooseImgAndUpload(url, beforUpload, success, fail, sourceType) {
    var that = this

    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: sourceType,
      success: function (res) {
        util.showBusy('正在识别')
        var filePath = res.tempFilePaths[0]

        beforUpload(filePath)

        // 上传图片
        wx.uploadFile({
          url,
          filePath: filePath,
          name: 'file',
          success: success,
          fail: fail
        })
      },
      fail: fail
    })
  },
  edit:function(){
    this.setData({
      textshow: true
    })
  },
  upload: function () {
    if (this.data.disabled) return;

    this.setData({
      progress: 0,
      disabled: true
    });
    _next.call(this);
  }
});
function _next() {
  var that = this;
  if (this.data.progress >= 100) {
    this.setData({
      disabled: false
    });
    return true;
  }
  this.setData({
    progress: ++this.data.progress
  });
  setTimeout(function () {
    _next.call(that);
  }, 20);
}