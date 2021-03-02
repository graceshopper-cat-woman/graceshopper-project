const User = require('./user')
const Mug = require('./mug')
const Order = require('./order')
const Cart = require('./cart')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

//many-to-many between Mug and Order
Mug.belongsToMany(Order, {through: Cart})
Order.belongsToMany(Mug, {through: Cart})
//one-to-one between User and Cart
User.hasOne(Cart)
Cart.belongsTo(User)
//one-to-many between User and Order
User.hasMany(Order)
Order.belongsTo(User)

module.exports = {
  User,
  Mug,
  Order,
  Cart
}
