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
  updateStatisticsOnNewData?: boolean
  percentage: {
    empty: number
    full: number
  }
}

const appConfig = config.get<AppConfig>('app')

export default appConfig
