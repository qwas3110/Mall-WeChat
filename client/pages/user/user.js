// 导入
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')


Page({
  data: {
    userInfo: null,
  },

  onTapAddress() {
    wx.showToast({
      title: '此功能暂未开放',
      icon: 'none'
    })
  },

  onTapKf() {
    wx.showToast({
      title: '此功能暂未开放',
      icon: 'none'
    })
  },
  onTapLogin() {
    qcloud.setLoginUrl(config.service.loginUrl)
    qcloud.login({
      success: result => {
        console.log('success')
        console.log(result)
      },

      fail: result => {
        console.log('error')
        console.log(result)
      }
    })
  },
  onGotUserInfo: function(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
})