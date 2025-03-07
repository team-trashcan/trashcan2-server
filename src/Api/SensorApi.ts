import { type Request, type Response } from 'express'
import Router from 'express-promise-router'
import saveToJson from '../Shared/saveToJson'
import readFromJson from '../Shared/readFromJson'
import fs from 'fs'
import path from 'path'
import { sensorData, sensorDataPercentage, sensorStatisticPercentage } from '../interface'
import mapTrashcanPercentage from '../Shared/mapTrashcanPercentage'
import hasPropertiesOfType from '../Shared/hasPropertiesOfType'
import logger from '../logger'

const router = Router()

router.post('/', (req: Request, res: Response) => {
  if (!hasPropertiesOfType<sensorData>(req.body)) {
    return res.status(400).json({
      message: 'Missing required property of type sensorData',
    })
  }
  if (isNaN(Number(req.body.data))) {
    return res.status(400).json({
      message: "Property 'data' needs to be a valid number",
    })
  }

  saveToJson(`trashcan-${req.body.name}`, req.body)
  return res.status(200).end()
})

router.get('/', (req: Request, res: Response) => {
  const jsonFiles: sensorData[] = []
  for (const file of fs.readdirSync(`${path.resolve(__dirname, '../../database')}`)) {
    const jsonData = readFromJson(file)
    if (hasPropertiesOfType<sensorData>(jsonData)) {
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
  const jsonData = readFromJson(`trashcan-${req.params.trashcanName}.json`)
  if (jsonData === undefined) {
    return res.status(404).json({
      message: `No data for trashcan-${req.params.trashcanName}.json`,
    })
  }
  if (hasPropertiesOfType<sensorData>(jsonData)) {
    return res.status(200).json(jsonData)
  } else {
    logger.warn(`Invalid json in file trashcan-${req.params.trashcanName}.json`)
    return res.status(500).end()
  }
})

router.get('/percentage', (req: Request, res: Response) => {
  const jsonFiles: sensorDataPercentage[] = []
  for (const file of fs.readdirSync(`${path.resolve(__dirname, '../../database')}`)) {
    const jsonData = readFromJson(file)
    if (hasPropertiesOfType<sensorData>(jsonData)) {
      jsonFiles.push({
        name: jsonData.name,
        percentage: mapTrashcanPercentage(jsonData.data),
      })
    } else {
      logger.warn(`Invalid json in file ${file}`)
    }
  }
  return res.status(200).json(jsonFiles)
})

router.get('/percentage/:trashcanName', (req: Request, res: Response) => {
  const jsonData = readFromJson(`trashcan-${req.params.trashcanName}.json`)
  if (jsonData === undefined) {
    return res.status(404).json({
      message: `No data for ${req.params.trashcanName}`,
    })
  }
  if (hasPropertiesOfType<sensorData>(jsonData)) {
    return res.status(200).json({
      name: jsonData.name,
      percentage: mapTrashcanPercentage(jsonData.data),
    })
  } else {
    logger.warn(`Invalid json in file trashcan-${req.params.trashcanName}.json`)
    return res.status(500).end()
  }
})

router.get('/percentage/:trashcanName/statistics', (req: Request, res: Response) => {
  const jsonDataArray = readFromJson(`statistics-trashcan-${req.params.trashcanName}.json`)
  if (jsonDataArray === undefined) {
    return res.status(404).json({
      message: `No statistics data for ${req.params.trashcanName}`,
    })
  }

  const validJsonData: sensorStatisticPercentage[] = []
  if (Array.isArray(jsonDataArray)) {
    for (const jsonData of jsonDataArray) {
      if (hasPropertiesOfType<sensorStatisticPercentage>(jsonData)) {
        validJsonData.push(jsonData)
      }
    }
  }

  return res.status(200).json(validJsonData)
})

export default router
