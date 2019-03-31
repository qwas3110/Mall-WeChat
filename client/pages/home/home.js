const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config.js')

Page({
  data: {
    productList: []
  },

  onLoad() {
		this.getProductList();
  },
  // 获取数据
	getProductList() {
		wx.showLoading({
			title: '商品数据加载中',
		})

		qcloud.request({
			url: config.service.productList,
			success: res => {
				wx:wx.hideLoading()
				console.log(res);
				let data = res.data;
				if (!data.code) {
					this.setData({
						productList: data.data
					})
				} else {
					wx.showToast({
						title: '商品数据加载错误',
						icon: 'none'
					})
				}
			},
			
			fail: () => {
				wx.hideLoading()

				wx.showToast({
					title: '商品数据加载错误',
					icon: 'none'
				})
			}
		})
	}

})