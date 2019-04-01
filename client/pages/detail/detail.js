const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')

Page({
  data: {
    product: {}
  },
  onLoad(options) {
		this.getProduct(options.id)
  },

	getProduct(id) {
		wx.showLoading({
			title: '商品数据加载中',
		})

		qcloud.request({
			url: config.service.productDetail + id,
			success: res => {
				wx.hideLoading()

				let data = res.data
				console.log(data);

				if (!data.code) {
					this.setData({
						product: data.data
					})
				} else {
					setTimeout(() => {
						wx.navigateBack()
					},2000)
				}
			},

			fail: () => {
				wx.hideLoading(() => {
					setTimeout(() => {
						wx.navigateBack()
					},2000)
				})
			}
		})
	}
})