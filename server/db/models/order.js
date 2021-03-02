const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  number: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  shippingStatus: {
    type: Sequelize.ENUM('processing', 'shipped', 'delivered'),
    allowNull: false,
    defaultValue: 'processing'
  }
})

module.exports = Order
