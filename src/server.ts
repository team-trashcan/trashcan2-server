import config from './config'
import app from './app'
import logger from './logger'

let serverInstance: ReturnType<typeof app.listen> | null = null

const startServer = () => {
  logger.debug('Starting server...')

  if (serverInstance) {
    serverInstance.close(() => {
      logger.info('Closed previous server')
    })
  }

  serverInstance = app.listen(config.port, () => {
    logger.info('Server is listening on port', config.port)
  })

  serverInstance.on('error', (error: Error) => {
    logger.error('Server error:', error)
    setTimeout(startServer, 5000)
  })

  const gracefulShutdown = (signal: string) => {
    logger.debug(`Received ${signal}. Closing server...`)
    if (serverInstance) {
      serverInstance.close(() => {
        logger.info('Server was closed')
        process.exit(0)
      })
    } else {
      logger.info('Server already closed')
      process.exit(0)
    }
  }
  process.on('SIGINT', () => gracefulShutdown('SIGINT'))
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
}

startServer()
