import fs from 'fs'
import config from '../config'
import { sensorData } from '../interface'
import logger from '../logger'

export default function readFromJson(fileName: string): sensorData | undefined {
  try {
    const rawData = fs.readFileSync(`${config.filePath}/${fileName}`, 'utf8')
    return JSON.parse(rawData) as sensorData
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT') {
      logger.debug('No file found with name:', fileName)
    } else {
      logger.error('Error reading data:', error)
    }
  }
}
