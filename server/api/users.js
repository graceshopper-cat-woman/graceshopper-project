const router = require('express').Router()
const {User, Order, MugOrder} = require('../db/models')
const adminsOnly = require('../utils/adminsOnly')
const usersOnly = require('../utils/usersOnly')
module.exports = router

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

//GET single User & order history
router.get('/:userId', async (req, res, next) => {
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
