// 导入
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')


Page({
  data: {
    userInfo: null,
  },

	onLoad() {
		this.checkSession({
			success: ({ userInfo }) => {
				this.setData({
					userInfo
				})
			},

		error: () => {
			
		}
		})
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
		this.doQcloudLogin({
			success: ({ userInfo }) => {
				this.setData({
					userInfo
				})
			}
		})
  },
  onGotUserInfo: function(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
  // 设置下载的url，请求成功及失败对应的回调函数
	// 只有用户本人能下载他自己的数据，设置参数login
	// 小程序默认只有第一次登陆时，才会返回登陆数据，否则数据为空
	// 所以设置在非第一次登陆下，再调用获取个人信息的功能
	getUserInfo({success,error}) {
		qcloud.request({
			url: config.service.requestUrl,
			login: true,
			success: result => {
				let date = result.data

				if (!date.code) {
					let userInfo = date.data

					success && success({
						userInfo
					})
				} else {
					error && error()
				}
			},
			fail: () => {
				error && error()
			}
		})
	},
	doQcloudLogin({ success, erroor }) {
		qcloud.login({
			success: res => {
				if (res) {
					let userInfo = res
					success && success({
						userInfo
					})
				} else {
					// 如果不是首次登陆，不会返回用户信息，请求用户信息接口获取
					this.getUserInfo({success,erroor})
				}
			},
			fail: () => {
				erroor & erroor()
			}
		})
	},
  // 执行会话检查功能
	checkSession({success,error}) {
		wx.checkSession({
			success: () => {
				this.getUserInfo({success,error})
			},
			fail: () => {
				error && error()
			}
		})
	}
})