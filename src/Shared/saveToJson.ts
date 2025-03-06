import fs from 'fs'
import config from '../config'
import logger from '../logger'

export default function saveToJson(fileName: string, data: object): void {
  try {
    const jsonData = JSON.stringify(data, null, 2)
    fs.writeFileSync(
      `${config.filePath}/${fileName.endsWith('.json') ? fileName : `${fileName}.json`}`,
      jsonData,
      'utf8'
    )
  } catch (error) {
    logger.error('Error saving data to json file:', error)
  }
}
