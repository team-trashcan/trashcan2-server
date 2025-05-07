import path from 'path'
import logger from '../logger'
import readDirectory from './readDirectory'
import readFromJson from './readFromJson'
import mapTrashcanPercentage from './mapTrashcanPercentage'
import hasPropertiesOfType from './hasPropertiesOfType'
import { sensorData, SensorData } from '../interface'
import addSensorStatistic from './addSensorStatistic'
import estimateTimeOfFull from './estimateTimeOfFull'

export default async function updateTrashcanStatistics(trashcanName?: string) {
  logger.debug(`Updating trashcan statistics${trashcanName !== undefined ? ` for ${trashcanName}` : ''}...`)

  const updateTime = new Date().toISOString()

  if (trashcanName !== undefined) {
    const content = readFromJson(`rawData/trashcan-${trashcanName}.json`)
    if (hasPropertiesOfType<SensorData>(content, sensorData)) {
      await addSensorStatistic(content.name, {
        date: updateTime,
        percentageFill: mapTrashcanPercentage(content.data),
      })
      estimateTimeOfFull(content.name)
    } else {
      logger.error(
        'Failed to update trashcan statistic: Invalid file structure in file',
        `rawData/trashcan-${trashcanName}.json`
      )
    }
  } else {
    const trashcanFiles = (await readDirectory(path.resolve(__dirname, '../../database/rawData'))).filter((file) =>
      file.endsWith('.json')
    )
    for (const trashcanFile of trashcanFiles) {
      const content = readFromJson(`rawData/${trashcanFile.split('/').at(-1)}`)
      if (hasPropertiesOfType<SensorData>(content, sensorData)) {
        await addSensorStatistic(content.name, {
          date: updateTime,
          percentageFill: mapTrashcanPercentage(content.data),
        })
        estimateTimeOfFull(content.name)
      } else {
        logger.error(
          'Failed to update trashcan statistic: Invalid file structure in file',
          `rawData/${trashcanFile.split('/').at(-1)}`
        )
      }
    }
  }

  logger.debug(`Updated trashcan statistics${trashcanName !== undefined ? ` for ${trashcanName}` : ''}`)
}
