

Page({
	data: {
		userInfo: {
			nickName: 'Laso',
			avatarUrl: "/images/user-sel.png"
		},
		// userInfo: {
		//	nickName: "Laso",
		//	avatarUrl: "", // 头像URL地址
		//}
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
	}
})