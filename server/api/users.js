const router = require('express').Router()
const {User, Order, Cart} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//GET single User & order history
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {userId: req.params.id},
      include: Order,
      Cart
    })
    res.send(user)
  } catch (error) {
    next(error)
  }
})
