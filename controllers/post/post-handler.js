const express = require('express'),
  router = express.Router()

const authorizationMiddleware = require('../../middlewares/authorizationMiddleware')

const { create } = require('./create')
const { getByUrl, getAll } = require('./read')
const { update } = require('./update')
const { deleteOne } = require('./delete')

router.get('/', getAll)
router.get('/:url', getByUrl)

router.post('/', authorizationMiddleware, create)
router.patch('/:id', authorizationMiddleware, update)
router.delete('/:id', authorizationMiddleware, deleteOne)

router.delete('/', (req, res) => {
  const Post = require('../../models/Post')
  Post.deleteMany().then(() => {
    return res.send('ok')
  })
})

module.exports = router