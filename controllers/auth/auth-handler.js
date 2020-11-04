const express = require('express'),
  router = express.Router()

const service = require('../../services/auth-service')

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).json({ message: 'Please provide both a "email" and a "password"' })

    const auth = await service.auth(email, password)

    return res.status(auth.status).json({
      message: auth.message || 'ok',
      token: auth.data || undefined
    })

  } catch (e) {
    return res.status(500).json({ message: e })
  }
})

module.exports = router