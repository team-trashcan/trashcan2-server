import { CronJob } from 'cron'
import config from './config'
import app from './app'
import logger from './logger'
import updateTrashcanStatistics from './Shared/updateTrashcanStatistics'

let serverInstance: ReturnType<typeof app.listen> | null = null

const startServer = () => {
  logger.debug('Starting server...')

  if (serverInstance) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    serverInstance.close(async () => {
      await new Promise((f) => setTimeout(f, 2000))
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
}

const cronjob = new CronJob('0 0 */6 * * *', updateTrashcanStatistics, null, true)
const gracefulShutdown = (signal: string) => {
  logger.debug(`Received ${signal}. Closing server...`)
  if (cronjob.isActive) {
    void cronjob.stop()
    logger.debug('CronJob stopped')
  }
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

startServer()
