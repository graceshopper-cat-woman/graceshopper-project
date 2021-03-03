const router = require('express').Router()
const {Order, Mug} = require('../db/models')

//GET /api/orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({include: 'userId', Mug})
    if (!orders) {
      res.send('No orders found on server')
    }
    res.send(orders)
  } catch (error) {
    next(error)
  }
})
