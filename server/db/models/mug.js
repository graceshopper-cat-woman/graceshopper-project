const Sequelize = require('sequelize')
const db = require('../db')

const Mug = db.define('mug', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '../../../images/defaultMugImage.jpg'
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false
  },
  size: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

module.exports = Mug
