require('dotenv').config()

const port = process.env.PORT || process.argv[2] || 3000

const serverConfig = require('./config')
const controllers = require('./controllers')

const startServer = async () => {
  const app = await serverConfig()
  app.use(controllers)
  return app.listen(port, () => {
    console.log(`[INFO] Listening on port ${port}!`)
  })
}

startServer()