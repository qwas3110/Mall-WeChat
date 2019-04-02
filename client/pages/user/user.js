// 导入
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')

const UNPROMPTED = 0
const UNAUTHORIZED = 1
const AUTHORIZED = 2


Page({
	data: {
		userInfo:null,
		locationAuthType: UNPROMPTED
	},

	onLoad() {
		// 在onload中调用。
		// 这样在页面初始会检查用户是否登陆，是否处在一个会话当中
		
		this.checkSession({
			// 设置成功时的回调函数
			success: ({userInfo}) => {
				this.setData({userInfo:userInfo})
			},
			error: () => {

			}
		})
	},
	opTapAddress() {
		wx.showToast({
			title: '此功能暂未开放',
			icon: 'none'
		})
	},
	// 执行会话检查
	checkSession({success,error}) {
		wx.checkSession({
			// 当成功我们希望调用getuserInfo 自动加载用户信息
			success: () => {
				this.getUserInfo({success,error})
			},

			fail: () => {
				error && error()
			}
		})
	},
	opTapKf() {
		wx.showToast({
			title: '此功能暂未开放',
			icon: 'none'
		})
	},
	onTapLogin() {
		this.login({
			success: ({ userInfo }) => {
				this.setData({
					userInfo:userInfo
				})
			}
		})
	},

	// 加载用户信息
	getUserInfo({success,error}) {
		qcloud.request({
			url: config.service.requestUrl,
			login: true,
			success: result => {
				let data = result.data;

				if (!data.code) {
					let userInfo = data.data;

					success && success({userInfo})
				} else {
					error && error()
				}
			},
			fail: () => {
				error && error()
			}
		})
	},

	// 封装登陆代码
	doQcloudLogin({success,error}) {
		// 调用qcloud 登陆接口
		qcloud.login({
			success: result => {
				if (result) {
					let userInfo = result;
					success && success({userInfo})
				} else {
					// 不是首次登陆，不会返回用户信息
					this.getUserInfo({success,error})
				}
			},
			fail: () => {error && error()}
		})
	},
	
	// 处理用户登陆授权逻辑
	login({success,error}) {
		wx.getSetting({
			success: res => {
				if (res.authSetting['scope.userInfo'] === false) {
					this.setData({
						locationAuthType: UNAUTHORIZED
					})
					// 已拒绝授权
					wx.showModal({
						title: '提示',
						content: '请授权我们获取你的用户信息',
						showCancel: false,
						success: () => {
							wx.openSetting({
								success: res => {
									if (res.authSetting['scope.userInfo'] === true) {
										this.doQcloudLogin({success,error})
									}
								}
							})
						}
					})
				} else {
					this.doQcloudLogin({success,error})
				}
			}
		})
	}
})