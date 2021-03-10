const router = require('express').Router()
const {Order, Mug} = require('../db/models')
const adminsOrUsers = require('../utils/adminsOrUsers')
module.exports = router

// GET single user's submitted orders
// GET /api/orders/user/:userId
router.get('/user/:userId', adminsOrUsers, async (req, res, next) => {
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
