const service = require('../../../services/post-service')

const getByUrl = async (req, res) => {
  try {
    const { url } = req.params

    const resp = await service.getByUrl(url)

    res.status(resp.status).json({
      message: resp.message,
      data: resp.data || undefined
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error ' + error })
  }
}

const getAll = async (req, res) => {
  try {
    const resp = await service.getAll()

    res.status(resp.status).json({
      message: resp.message,
      data: resp.data || undefined
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error ' + error })
  }
}

module.exports = {
  getByUrl,
  getAll,
}


