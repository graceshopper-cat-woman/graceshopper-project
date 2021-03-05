module.exports = (req, res, next) => {
  if (
    (req.user && req.user.isAdmin) ||
    (req.user && req.user.id === +req.params.userId)
  )
    next()
  else {
    const err = new Error('Unauthorized!')
    err.status = 401
    next(err)
  }
}
