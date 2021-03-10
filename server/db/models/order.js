const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  number: {
    type: Sequelize.INTEGER,
    unique: true
  },
  orderStatus: {
    type: Sequelize.ENUM('processing', 'shipped', 'delivered', 'inCart'),
    allowNull: false,
    defaultValue: 'inCart'
  }
})

Order.beforeCreate(async order => {
  order.number = Math.floor(Math.random() * (99999 - 10000) + 10000)
  const doesNumberExist = await Order.findOne({number: order.number})

  if (doesNumberExist.number) {
    Math.floor(10000 + Math.random() * 90000)
  }
})

module.exports = Order
