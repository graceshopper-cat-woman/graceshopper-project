const router = require('express').Router()
const {User} = require('../db/models')
const adminsOnly = require('../utils/adminsOnly')
const adminsOrUsers = require('../utils/adminsOrUsers')
module.exports = router

// GET /api/users/
router.get('/', adminsOnly, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email', 'isAdmin']
    })
    //only send data if the user is authorized to view the content
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET single User
// GET /api/users/:userId
router.get('/:userId', adminsOrUsers, async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: ['id', 'firstName', 'lastName', 'email', 'isAdmin'],
      where: {id: req.params.userId}
    })
    if (!user) {
      res.status(404).send('This user does not exist!')
    }
    res.send(user)
  } catch (error) {
    next(error)
  }
})
