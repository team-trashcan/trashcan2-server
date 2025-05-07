import { type Request, type Response } from 'express'
import Router from 'express-promise-router'
import readFromJson from '../Shared/readFromJson'
import fs from 'fs'
import path from 'path'
import {
  sensorData,
  SensorData,
  SensorDataPercentage,
  sensorStatisticPercentage,
  SensorStatisticPercentage,
} from '../interface'
import mapTrashcanPercentage from '../Shared/mapTrashcanPercentage'
import hasPropertiesOfType from '../Shared/hasPropertiesOfType'
import logger from '../logger'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  const jsonFiles: SensorDataPercentage[] = []
  for (const file of fs
    .readdirSync(`${path.resolve(__dirname, '../../database/rawData')}`)
    .filter((f) => f !== '.gitkeep')) {
    const jsonData = readFromJson(`rawData/${file}`)
    if (hasPropertiesOfType<SensorData>(jsonData, sensorData)) {
      jsonFiles.push({
        name: jsonData.name,
        percentageFill: mapTrashcanPercentage(jsonData.data),
      })
    } else {
      logger.warn(`Invalid json in file ${file}`)
    }
  }
  return res.status(200).json(jsonFiles)
})

router.get('/:trashcanName', (req: Request, res: Response) => {
  const jsonData = readFromJson(`rawData/trashcan-${req.params.trashcanName}.json`)
  if (jsonData === undefined) {
    return res.status(404).json({
      message: `No data for ${req.params.trashcanName}`,
    })
  }
  if (hasPropertiesOfType<SensorData>(jsonData, sensorData)) {
    return res.status(200).json({
      name: jsonData.name,
      percentageFill: mapTrashcanPercentage(jsonData.data),
    })
  } else {
    logger.warn(`Invalid json in file trashcan-${req.params.trashcanName}.json`)
    return res.status(500).end()
  }
})

router.get('/percentage/:trashcanName/statistics', (req: Request, res: Response) => {
  const jsonDataArray = readFromJson(`statistics/trashcan-${req.params.trashcanName}.json`)
  if (jsonDataArray === undefined) {
    return res.status(404).json({
      message: `No statistics data for ${req.params.trashcanName}`,
    })
  }

  const validJsonData: SensorStatisticPercentage[] = []
  if (Array.isArray(jsonDataArray)) {
    for (const jsonData of jsonDataArray) {
      if (hasPropertiesOfType<SensorStatisticPercentage>(jsonData, sensorStatisticPercentage)) {
        validJsonData.push(jsonData)
      }
    }
  }

  return res.status(200).json(validJsonData)
})

export default router
