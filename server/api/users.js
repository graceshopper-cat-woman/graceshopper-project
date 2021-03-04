const router = require('express').Router()
const {User, Order, Mug, MugOrder} = require('../db/models')
const adminsOnly = require('../utils/adminsOnly')
const usersOnly = require('../utils/usersOnly')
module.exports = router

// GET /api/users/
router.get('/', adminsOnly, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'isAdmin']
    })
    //only send data if the user is authorized to view the content
    res.json(users)
    // if (req.body.isAdmin) {
    // } else {
    //   res.status(401).send('Role not authorized to view this data')
    // }
    console.log('REQ.USER', req.user)
  } catch (err) {
    next(err)
  }
})

// GET single User & order history
// GET /api/users/:userId
router.get('/:userId', usersOnly, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {id: req.params.userId},
      include: {
        model: Order,
        where: {
          userId: req.params.userId
        }
      }
    })

    res.send(user)
  } catch (error) {
    next(error)
  }
})

// GET single user's orders
// GET /api/users/:userId/orders
router.get('/:userId/orders', usersOnly, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId
      },
      include: {model: Mug}
    })
    if (!orders) {
      res.send('No orders found on server')
    }
    res.send(orders)
  } catch (error) {
    next(error)
  }
})
