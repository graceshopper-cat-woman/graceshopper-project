const router = require('express').Router()
const {Mug} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const mugs = await Mug.findAll()

    res.json(mugs)
  } catch (error) {
    next(error)
  }
})

router.get('/:mugId', async (req, res, next) => {
  try {
    const mug = await Mug.findByPk(req.params.mugId)
    if (!mug) {
      res.send(`This mug doesn't exist`)
    }
    res.send(mug)
  } catch (error) {
    next(error)
  }
})
