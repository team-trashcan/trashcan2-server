/* eslint-disable @typescript-eslint/no-unused-vars */
import { type NextFunction, type Request, type Response } from 'express'
import logger from './logger'

export default function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction): Response {
  if (error instanceof SyntaxError) {
    return res.status(400).json({
      message: error.message,
    })
  }

  logger.error('Generic Error on handling apiCall:', error)
  return res.status(500).json({
    message: 'API Error',
  })
}
