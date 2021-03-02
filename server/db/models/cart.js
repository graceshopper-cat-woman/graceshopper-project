const Sequelize = require('sequelize')
const db = require('../db')
const Mug = require('./mug')
const Order = require('./order')

const Cart = db.define('cart', {
  MugId: {
    type: Sequelize.INTEGER,
    references: {
      model: Mug,
      key: 'id'
    }
  },
  OrderId: {
    type: Sequelize.INTEGER,
    references: {
      model: Order,
      key: 'id'
    }
  },
  quantityPerItem: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  totalQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  pricePerItem: {
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      min: 0.0
    }
  },
  totalPrice: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0.0,
    validate: {
      min: 0.0
    }
  }
})

module.exports = Cart
