const Sequelize = require('sequelize')
const db = require('../db')

const MugOrder = db.define('mugOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = MugOrder
