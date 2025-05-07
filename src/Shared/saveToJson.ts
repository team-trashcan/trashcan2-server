import fs, { existsSync } from 'fs'
import config from '../config'
import logger from '../logger'

export default function saveToJson(fileName: string, data: object, append?: boolean): void {
  try {
    const jsonData = JSON.stringify(data, null, 2)
    const filePath = `${config.filePath}/${fileName.endsWith('.json') ? fileName : `${fileName}.json`}`
    if (append && existsSync(filePath)) {
      fs.appendFileSync(filePath, jsonData, 'utf8')
    } else {
      fs.writeFileSync(filePath, jsonData, 'utf8')
    }
  } catch (error) {
    logger.error('Error saving data to json file:', error)
  }
}
