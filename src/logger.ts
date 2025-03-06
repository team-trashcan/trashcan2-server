import appConfig, { LogLevel } from './config'

class Logger {
  protected logLevel: LogLevel
  protected timestampEnabled: boolean

  constructor(logLevel = LogLevel.info, timestampEnabled = false) {
    this.logLevel = logLevel
    this.timestampEnabled = timestampEnabled
  }

  private pad(number: number) {
    return number.toString().padStart(2, '0')
  }

  private timestamp(): string {
    if (!this.timestampEnabled) return ''
    const now = new Date()
    return `[${this.pad(now.getDate())}-${this.pad(now.getMonth() + 1)}-${now.getFullYear()}_${this.pad(now.getHours())}:${this.pad(now.getMinutes())}:${this.pad(now.getSeconds())}] `
  }

  private parseArgument(argument: unknown): string {
    if (typeof argument === 'string') return argument
    return JSON.stringify(argument)
  }

  private log(prefix: string, argumentArray: unknown[]) {
    if (LogLevel[this.logLevel as unknown as keyof typeof LogLevel] > LogLevel[prefix as keyof typeof LogLevel]) return
    console.log(
      `${this.timestamp()}[${prefix.toUpperCase()}] ${argumentArray.map((arg) => this.parseArgument(arg)).join(' ')}`
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
