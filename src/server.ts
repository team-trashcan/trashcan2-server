import config from './config'
import app from './app'

let serverInstance: ReturnType<typeof app.listen> | null = null

const startServer = () => {
  if (serverInstance) {
    serverInstance.close(() => {
      console.log('Closed previous server')
    })
  }

  serverInstance = app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}\nAPI Documentation at /v1/docs`)
  })

  serverInstance.on('error', (error: Error) => {
    console.error('Server error:', error)
    setTimeout(startServer, 5000)
  })

  const gracefulShutdown = (signal: string) => {
    console.log(`\nReceived ${signal}. Closing server...`)
    if (serverInstance) {
      serverInstance.close(() => {
        console.log('Server was closed')
        process.exit(0)
      })
    } else {
      console.log('Server already closed')
      process.exit(0)
    }
  }
  process.on('SIGINT', () => gracefulShutdown('SIGINT'))
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
}

startServer()
