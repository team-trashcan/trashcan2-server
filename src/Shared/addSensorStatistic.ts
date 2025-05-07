import { readFile, writeFile } from 'fs/promises'
import config from '../config'
import logger from '../logger'
import hasPropertiesOfType from './hasPropertiesOfType'
import { sensorStatisticPercentage, SensorStatisticPercentage } from '../interface'

export default async function addSensorStatistic(
  trashcanName: string,
  data: SensorStatisticPercentage
): Promise<boolean> {
  try {
    const filePath = `${config.filePath}/statistics/trashcan-${trashcanName}.json`

    let fileContent
    try {
      fileContent = JSON.parse((await readFile(filePath)).toString()) as unknown
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT' || (error as NodeJS.ErrnoException).syscall !== 'open') {
        throw new Error(`Failed to open file ${filePath}`)
      }
      // File does not exist, create, initialize and write data
      await writeFile(
        filePath,
        `{"name": "${trashcanName}", "data":[{"date": "${data.date}", "percentageFill": ${data.percentageFill}}]}`
      )
      return true
    }

    if (
      !hasPropertiesOfType<{ name: string; data: SensorStatisticPercentage[] }>(fileContent, [
        { key: 'name', type: 'string' },
        {
          key: 'data',
          type: 'array',
          items: sensorStatisticPercentage,
        },
      ])
    ) {
      throw new Error(`Invalid file structure in ${filePath}`)
    } else {
      fileContent.data.push(data)
      await writeFile(filePath, JSON.stringify(fileContent))
    }

    return true
  } catch (error) {
    logger.error('Error saving data to json file:', error)
    return false
  }
}
