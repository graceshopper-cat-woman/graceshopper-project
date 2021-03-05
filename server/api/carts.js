const router = require('express').Router()
const {User, Order, Mug, MugOrder} = require('../db/models')
const usersOnly = require('../utils/usersOnly')
module.exports = router

// GET cart
// GET /api/carts
router.get('/', async (req, res, next) => {
  try {
    let order
    if (req.user) {
      order = await Order.findOne({
        where: {
          userId: req.user.id,
          orderStatus: 'inCart'
        },
        include: {
          model: Mug
        }
      })
    } else if (req.session.guestCart) {
      order = await Order.findOne({
        where: {
          id: req.session.guestCart
        },
        include: {
          model: Mug
        }
      })
    }
    if (!order) {
      res.send('Cart is empty')
    } else {
      res.send(order.mugs)
    }
  } catch (error) {
    next(error)
  }
})

//add a Mug to cart
// POST /api/carts/
router.post('/', async (req, res, next) => {
  try {
    if (req.user) {
      const order = await Order.findOrCreate({
        where: {
          userId: req.user.id,
          orderStatus: 'inCart'
        }
      })
      //check if item exists in cart (and increment quantity), else create and return new item
      const newItem = await MugOrder.create({
        quantity: req.body.quantity,
        mugId: req.body.mugId,
        orderId: order.id
      })
      res.send(newItem)
    } else {
      let newOrder
      const order = await Order.findOne({
        where: {
          id: newOrder.id,
          orderStatus: 'inCart'
        }
      })
      if (!order) {
        newOrder = await Order.create({
          where: {
            orderStatus: 'inCart'
          }
        })
        req.session.guestCart = newOrder.id
      }
      //session store for guest cart
    }
  } catch (error) {
    next(error)
  }
})

//remove a product from cart
//increment/decrement a product in cart
