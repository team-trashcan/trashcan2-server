import config from 'config'

export enum LogLevel {
  debug = 0,
  info = 1,
  warn = 2,
  error = 3,
}

export interface AppConfig {
  logger?: {
    logLevel?: LogLevel
    timestampEnabled?: boolean
  }
  port: number
  filePath: string
}

const appConfig = config.get<AppConfig>('app')

if (process.env.ALLOW_CONFIG_MUTATIONS?.toLowerCase() === 'true') {
  const environmentLogLevel = process.env.LOG_LEVEL?.toLowerCase()
  if (environmentLogLevel !== undefined && environmentLogLevel in LogLevel) {
    appConfig.logger ??= {}
    appConfig.logger.logLevel = environmentLogLevel as unknown as LogLevel
  }

  const environmentTimestampEnabled = process.env.TIMESTAMP_ENABLED?.toLowerCase()
  if (environmentTimestampEnabled === 'true' || environmentTimestampEnabled === 'false') {
    appConfig.logger ??= {}
    appConfig.logger.timestampEnabled = Boolean(environmentTimestampEnabled)
  }
}

export default appConfig
