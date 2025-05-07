import fs from 'fs'
import config from '../config'
import logger from '../logger'

export default function readFromJson(fileName: string) {
  try {
    const rawData = fs.readFileSync(`${config.filePath}/${fileName}`, 'utf8')
    return JSON.parse(rawData) as unknown
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT') {
      logger.debug('No file found with name:', fileName)
    } else {
      logger.error('Error reading data:', error)
    }
  }
}
