import appConfig, { LogLevel } from './config'

class Logger {
  protected logLevel: LogLevel
  protected timestampEnabled: boolean

  constructor(logLevel = LogLevel.info, timestampEnabled = false) {
    this.logLevel = logLevel
    this.timestampEnabled = timestampEnabled
  }

  private log(prefix: string, argumentArray: unknown[]) {
    if (LogLevel[this.logLevel as unknown as keyof typeof LogLevel] > LogLevel[prefix as keyof typeof LogLevel]) return
    console.log(
      `${this.timestampEnabled ? `[${new Date().toISOString()}] ` : ''}[${prefix.toUpperCase()}] ${argumentArray
        .map((arg) => (typeof arg !== 'string' ? String(arg) : arg))
        .join(' ')}`
    )
  }

  public debug(...args: unknown[]) {
    this.log('debug', args)
  }
  public info(...args: unknown[]) {
    this.log('info', args)
  }
  public warn(...args: unknown[]) {
    this.log('warn', args)
  }
  public error(...args: unknown[]) {
    this.log('error', args)
  }
}

const logger = new Logger(appConfig.logger?.logLevel, appConfig.logger?.timestampEnabled)
export default logger
