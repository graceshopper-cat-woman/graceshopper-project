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
          id: req.session.guestCart,
          orderStatus: 'inCart'
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
    res.status(201).send(order)
  } catch (error) {
    next(error)
  }
})

// increment/decrement a product IN cart
// PUT api/carts (status 201)
router.put('/', async (req, res, next) => {
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
    next(error)
  }
})
// remove a product completely from cart
// DELETE /api/carts/ (status 204)
router.put('/delete', async (req, res, next) => {
  const itemId = req.body.mugId
  try {
    const item = await MugOrder.findOne({
      where: {
        orderId: req.body.orderId,
        mugId: req.body.mugId
      }
    })

    await item.destroy()
    res.status(200).json(itemId)
  } catch (error) {
    next(error)
  }
})
// checkout
// PUT /api/carts/checkout
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
      }
    })

    purchasedMugs.map(async mugOrder => {
      //find each mug with matching orderid, mugid
      let mug = await Mug.findByPk(mugOrder.mugId)
      await mug.update({inventory: mug.inventory - mugOrder.quantity})
    })

    const updatedPurchases = await purchases.update({orderStatus: 'processing'})

    if (updatedPurchases.userId === null) {
      req.session.destroy()
    }

    res.status(201).send(updatedPurchases)
  } catch (error) {
    next(error)
  }
})
