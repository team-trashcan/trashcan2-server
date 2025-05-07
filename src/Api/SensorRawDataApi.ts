import { type Request, type Response } from 'express'
import Router from 'express-promise-router'
import saveToJson from '../Shared/saveToJson'
import readFromJson from '../Shared/readFromJson'
import fs from 'fs'
import path from 'path'
import { sensorData, SensorData } from '../interface'
import hasPropertiesOfType from '../Shared/hasPropertiesOfType'
import logger from '../logger'
import updateTrashcanStatistics from '../Shared/updateTrashcanStatistics'
import appConfig from '../config'

const router = Router()

router.post('/', (req: Request, res: Response) => {
  if (!hasPropertiesOfType<SensorData>(req.body, sensorData)) {
    return res.status(400).json({
      message: 'Missing required property of type SensorData',
    })
  }
  if (isNaN(Number(req.body.data))) {
    return res.status(400).json({
      message: "Property 'data' needs to be a valid number",
    })
  }

  saveToJson(`rawData/trashcan-${req.body.name}`, req.body)

  if (appConfig.updateStatisticsOnNewData) {
    void updateTrashcanStatistics(req.body.name)
  }

  return res.status(200).end()
})

router.get('/', (req: Request, res: Response) => {
  const jsonFiles: SensorData[] = []
  for (const file of fs
    .readdirSync(`${path.resolve(__dirname, '../../database/rawData')}`)
    .filter((f) => f !== '.gitkeep')) {
    const jsonData = readFromJson(`rawData/${file}`)
    if (hasPropertiesOfType<SensorData>(jsonData, sensorData)) {
      if (jsonData !== undefined) {
        jsonFiles.push(jsonData)
      }
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
      message: `No data for trashcan-${req.params.trashcanName}.json`,
    })
  }
  if (hasPropertiesOfType<SensorData>(jsonData, sensorData)) {
    return res.status(200).json(jsonData)
  } else {
    logger.warn(`Invalid json in file trashcan-${req.params.trashcanName}.json`)
    return res.status(500).end()
  }
})

export default router
