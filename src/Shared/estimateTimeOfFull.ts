import { sensorData, SensorData, SensorStatisticFileStructure, sensorStatisticFileStructure } from '../interface'
import logger from '../logger'
import hasPropertiesOfType from './hasPropertiesOfType'
import readFromJson from './readFromJson'
import saveToJson from './saveToJson'

// Polished ChatGPT math magic
export default function estimateTimeOfFull(trashcanName: string) {
  logger.debug('Estimating TimeOfFull for', trashcanName)

  const statistics = readFromJson(`statistics/trashcan-${trashcanName}.json`)
  if (!hasPropertiesOfType<SensorStatisticFileStructure>(statistics, sensorStatisticFileStructure))
    throw new Error(`Invalid data structure in file statistics/trashcan-${trashcanName}.json`)

  const filtered = statistics.data.map((point) => ({
    x: new Date(point.date).getTime(),
    y: Math.max(0, Math.min(100, point.percentageFill)),
  }))

  let estimatedTime = 0
  const n = filtered.length
  if (n >= 2) {
    const sumX = filtered.reduce((sum, point) => sum + point.x, 0)
    const sumY = filtered.reduce((sum, point) => sum + point.y, 0)
    const sumXY = filtered.reduce((sum, point) => sum + point.x * point.y, 0)
    const sumX2 = filtered.reduce((sum, point) => sum + point.x * point.x, 0)

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
    const intercept = (sumY - slope * sumX) / n

    estimatedTime = (100 - intercept) / slope
    if (!isFinite(estimatedTime)) estimatedTime = 0
  }

  const filePath = `rawData/trashcan-${trashcanName}.json`
  const content = readFromJson(filePath)
  if (hasPropertiesOfType<SensorData>(content, sensorData)) {
    content.estimatedTimeOfFull = new Date(estimatedTime).toISOString()
    saveToJson(filePath, content)
  }
}
