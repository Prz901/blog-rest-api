const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authorization = req.headers['authorization']

  if (!authorization)
    return res.status(400).send('Please provide an valid authorization header')

  try {
    const accessToken = authorization.split('Bearer ')[1]

    if (!accessToken)
      return res.status(400).send('Please provide an access-token')

    jwt.verify(accessToken, process.env.SECRET, (err, decoded) => {
      if (err)
        return res.status(401).send('Please provide a Valid x-access-token ' + err)
      const { email } = decoded
      res.locals.email = email
      next()
    })

  } catch (e) {
    return res.status(400).send('Please provide an valid authorization header')
  }
}