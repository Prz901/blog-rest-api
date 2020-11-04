const service = require('../../../services/user-service')

const create = async (req, res) => {
  const user = req.body

  try {
    const resp = await service.create(user)

    res.status(resp.status).json({
      message: resp.message,
      data: resp.data || undefined
    })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

module.exports = { create, }