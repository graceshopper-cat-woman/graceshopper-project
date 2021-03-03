const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  number: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  },
  orderStatus: {
    type: Sequelize.ENUM('processing', 'shipped', 'delivered', 'inCart'),
    allowNull: false,
    defaultValue: 'inCart'
  }
})

module.exports = Order
