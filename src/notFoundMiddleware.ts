import { type Request, type Response } from 'express'

export default function notFoundMiddleware(req: Request, res: Response): void {
  res.status(404).json({
    message: 'Not Found',
    path: req.path,
  })
}
