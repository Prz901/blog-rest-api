const service = require('../../../services/user-service')

const update = async (req, res) => {
  const user = req.body
  const { id } = req.params

  if (user.email || user.posts) {
    return res.status(400).json({ message: 'Cant update either email nor posts' }) 
  }

  try {
    const resp = await service.update(id, user)

    res.status(resp.status).json({
      message: resp.message,
      data: resp.data || undefined
    })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

module.exports = { update, }