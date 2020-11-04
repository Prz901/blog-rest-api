const service = require('../../../services/post-service')

const deleteOne = async (req, res) => {
  const { id } = req.params
  const { email } = res.locals

  try {
    const resp = await service.deleteOne(id, email)

    res.status(resp.status).json({
      message: resp.message,
      data: resp.data || undefined
    })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

module.exports = { deleteOne, }