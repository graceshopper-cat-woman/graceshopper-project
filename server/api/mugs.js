const router = require('express').Router()
const {NormalModuleReplacementPlugin} = require('webpack')
const {Mug} = require('../db/models')
const adminsOnly = require('../utils/adminsOnly')
module.exports = router

// GET /api/mugs
router.get('/', async (req, res, next) => {
  try {
    const mugs = await Mug.findAll()
    console.log('REQ.SESSION.ID IN ALL MUGS-->', req.session.id)
    res.json(mugs)
  } catch (error) {
    next(error)
  }
})

// GET /api/mugs/:mugId
router.get('/:mugId', async (req, res, next) => {
  try {
    const mug = await Mug.findByPk(req.params.mugId)
    if (!mug) {
      res.status(404).send(`This mug doesn't exist`)
    }
    res.send(mug)
  } catch (error) {
    next(error)
  }
})

// DELETE /api/mugs/:mugId
router.delete('/:mugId', adminsOnly, async (req, res, next) => {
  try {
    const mug = await Mug.findByPk(req.params.mugId)
    if (!mug) {
      res.send(`This mug doesn't exist`)
    }
    await mug.destroy()
    res.status(204).send('Successfully deleted!')
  } catch (error) {
    next(error)
  }
})

// POST /api/mugs
router.post('/', adminsOnly, async (req, res, next) => {
  try {
    const [newMug, created] = await Mug.findOrCreate({where: req.body})
    if (created) {
      res.send(newMug)
    } else {
      res.status(201).send('This mug already exists!')
    }
  } catch (error) {
    next(error)
  }
})

// PUT /api/mugs/:mugId
router.put('/:mugId', adminsOnly, async (req, res, next) => {
  try {
    const mug = await Mug.findByPk(req.params.mugId)
    if (!mug) {
      res.send(`This mug doesn't exist`)
    }
    const updatedMug = await mug.update(req.body)
    res.status(201).send(updatedMug)
  } catch (error) {
    next(error)
  }
})
