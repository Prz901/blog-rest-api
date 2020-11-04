const service = require('../../../services/post-service')

const update = async (req, res) => {
  const post = req.body
  const { id } = req.params
  const { email } = res.locals
  try {
    const resp = await service.update(id, email, post)

    res.status(resp.status).json({
      message: resp.message,
      data: resp.data || undefined
    })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

module.exports = { update, }