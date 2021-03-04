module.exports = (req, res, next) => {
  if (req.user && req.user.id === req.params.userId) next()
  else {
    const err = new Error('Please sign up or log in!')
    err.status = 401
    next(err)
  }
}
