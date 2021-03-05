const router = require('express').Router()
const {Order, Mug, MugOrder} = require('../db/models')
module.exports = router

// GET cart
// GET /api/carts/
router.get('/', async (req, res, next) => {
  try {
    let order
    //user cart
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
      //guest cart
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
      //send all cart items
      res.send(order.mugs)
    }
  } catch (error) {
    next(error)
  }
})

// add a Mug TO cart
// PUT /api/carts/
router.put('/', async (req, res, next) => {
  try {
    let order
    //user cart
    if (req.user) {
      order = await Order.findOrCreate({
        where: {
          userId: req.user.id,
          orderStatus: 'inCart'
        },
        include: {
          model: Mug
        }
      })
      //guest cart
    } else if (req.session.guestCart) {
      order = await Order.findOne({
        where: {
          id: req.session.guestCart,
          orderStatus: 'inCart'
        },
        include: {
          model: Mug
        }
      })
    } else {
      order = await Order.create({
        where: {
          orderStatus: 'inCart'
        },
        include: {
          model: Mug
        }
      })
      req.session.guestCart = order.id
    }
    // define mug and check if it exists in cart
    const mugToAdd = await MugOrder.findOne({
      where: {
        orderId: order.id,
        mugId: req.body.mugId
      }
    })
    if (mugToAdd) {
      //if mug exists, update the quantity
      await mugToAdd.update({quantity: mugToAdd.quantity + req.body.quantity})
    } else {
      //else, add to cart
      await MugOrder.create({
        quantity: req.body.quantity,
        mugId: req.body.mugId,
        orderId: order.id
      })
    }
    //send all cart items
    res.send(order.mugs)
  } catch (error) {
    next(error)
  }
})

// increment/decrement a product IN cart
// PUT api/carts

// remove a product from cart
// DELETE /api/carts/

// checkout
// PUT /api/carts/checkout --> update order status to processing
