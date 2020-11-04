const userService = require('../../../services/user-service')

const getById = async (req, res) => {
  try {
    const { id } = req.params

    const resp = await userService.getById(id, req.accessToken)

    res.status(resp.status).json({
      message: resp.message,
      data: resp.data || undefined
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error ' + error })
  }
}

module.exports = {
  getById,
}


