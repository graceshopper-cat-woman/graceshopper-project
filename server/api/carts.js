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
router.put('/add', async (req, res, next) => {
  try {
    let order
    //user cart
    if (req.user) {
      ;[order] = await Order.findOrCreate({
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
        mugId: req.body.mugId,
        price: req.body.mugPrice
      }
    })
    if (mugToAdd) {
      //if mug exists, update the quantity
      await mugToAdd.update({
        quantity: Number(mugToAdd.quantity) + Number(req.body.quantity)
      })
    } else {
      //else, add to cart
      await MugOrder.create({
        quantity: Number(req.body.quantity),
        mugId: req.body.mugId,
        orderId: order.id,
        price: req.body.mugPrice
      })
    }
    //send all cart items
    if (!order) res.send('HELLO WORLD')
    res.status(201).send(order)
  } catch (error) {
    next(error)
  }
})

// increment/decrement a product IN cart
// PUT api/carts (status 201)
router.put('/', async (req, res, next) => {
  console.log('INSIDE PUT ROUTE')
  let item
  try {
    item = await MugOrder.findOne({
      where: {
        orderId: req.body.orderId,
        mugId: req.body.mugId
      }
    })
    let updated
    if (req.body.quantity > 0) {
      updated = await item.update({
        quantity: req.body.quantity
      })
      res.status(201).send(updated)
    } else {
      updated = await item.destroy()
      res.sendStatus(204)
    }
  } catch (error) {
    console.log('REQ.BODY ERROR')
    next(error)
  }
})
// remove a product completely from cart
// DELETE /api/carts/ (status 204)
router.put('/delete', async (req, res, next) => {
  console.log('req.body--->', req.body)
  const itemId = req.body.mugId
  try {
    const item = await MugOrder.findOne({
      where: {
        orderId: req.body.orderId,
        mugId: req.body.mugId
      }
    })
    //await item.destroy()
    await item.destroy()
    console.log('ITEM TO DESTROY', itemId)
    res.json(itemId)
  } catch (error) {
    console.log('ERROR DELETING', error)
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
