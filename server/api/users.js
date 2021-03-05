const router = require('express').Router()
const {User, Order, Mug, MugOrder} = require('../db/models')
const adminsOnly = require('../utils/adminsOnly')
const usersOnly = require('../utils/usersOnly')
const adminsOrUsers = require('../utils/adminsOrUsers')
module.exports = router

// GET /api/users/
router.get('/', adminsOnly, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email', 'isAdmin']
    })
    //only send data if the user is authorized to view the content
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET single User & order history
// GET /api/users/:userId
router.get('/:userId', adminsOrUsers, async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: ['id', 'firstName', 'lastName', 'email', 'isAdmin'],
      where: {id: req.params.userId}
    })
    if (!user) {
      res.status(404).send('This user does not exist!')
    }
    res.send(user)
  } catch (error) {
    next(error)
  }
})

// GET single user's submitted orders
// GET /api/users/:userId/orders
router.get('/:userId/orders', adminsOrUsers, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId,
        orderStatus: ['processing', 'shipped', 'delivered']
      },
      include: {model: Mug}
    })
    if (!orders) {
      res.status(404).send('No orders found on server')
    }
    res.send(orders)
  } catch (error) {
    next(error)
  }
})
