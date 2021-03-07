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
      res.send(order)
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
    res.status(201).send(order.mugs)
  } catch (error) {
    next(error)
  }
})

// increment/decrement a product IN cart
// PUT api/carts (status 201)
router.put('/', async (req, res, next) => {
  try {
    let item = await MugOrder.findOne({
      where: {
        orderId: req.body.order.id,
        mugId: req.body.mug.id
      }
    })
    res.status(201).send(await item.update(req.body.quantity))
  } catch (error) {
    next(error)
  }
})
// remove a product completely from cart
// DELETE /api/carts/ (status 204)
router.delete('/', async (req, res, next) => {
  try {
    let item = await MugOrder.findOne({
      where: {
        orderId: req.body.order.id,
        mugId: req.body.mug.id
      }
    })
    await item.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
// checkout
// PUT /api/carts/checkout --> update order status to processing (status 201)
router.put('/checkout', async (req, res, next) => {
  try {
    let purchases = await Order.findOne({
      where: {
        id: req.body.order.id,
        orderStatus: 'inCart'
      }
    })
    //update inventory
    let purchasedMugs = await MugOrder.findAll({
      where: {
        orderId: req.body.order.id
      },
      include: {
        model: Mug
      }
    })
    purchasedMugs.mugs.map(async (mug, idx) => {
      await mug.update({inventory: mug.inventory - purchasedMugs[idx].quantity})
    })
    res.status(201).send(await purchases.update({orderStatus: 'processing'}))
  } catch (error) {
    next(error)
  }
})
