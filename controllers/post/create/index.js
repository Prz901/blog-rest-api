const service = require('../../../services/post-service')

const create = async (req, res) => {
  const post = req.body
  const { email } = res.locals
  try {
    const resp = await service.create(post, email)

    res.status(resp.status).json({
      message: resp.message,
      data: resp.data || undefined
    })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

module.exports = { create, }