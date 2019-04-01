//  我们引入了 /utils/db.js 中的代码，名为 DB
const DB = require('../utils/db.js');

// 同时将 export 部分的代码打包导出，供外界调用。在 export 中，这里是一个功能名-功能对应代码的 JSON

// 列出商品的各个功能，给他一个list的名字，然后输入对应的函数 
// ctx 小程序中间件，将获取的数据暂存在 data变量中，以便用户返给用户
module.exports = {
  list: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM product;")
  },

  detail: async ctx => {
    let productId = +ctx.params.id
    let product

    if (!isNaN(productId)) {
      product = (await DB.query('select * from product where product.id = ?', [productId]))[0]
    } else {
      product = {}
    }

    ctx.state.data = product
  }
}