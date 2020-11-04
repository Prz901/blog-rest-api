const express = require('express'),
  router = express.Router()

const authorizationMiddleware = require('../../middlewares/authorizationMiddleware')

const { create } = require('./create')
const { update } = require('./update')
const { getById } = require('./read')

router.get('/:id', getById)
router.patch('/:id', authorizationMiddleware, update)
router.post('/', create)

// Deactive account

router.get('/', (req, res) => {
  const User = require('../../models/User')
  User.find().then((users) => {
    return res.send(users)
  })
})

router.delete('/', (req, res) => {
  const User = require('../../models/User')
  User.deleteMany().then(() => {
    return res.send('ok')
  })
})

module.exports = router