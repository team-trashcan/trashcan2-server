import { type Request, type Response } from 'express'
import Router from 'express-promise-router'

const router = Router()

router.get('/livez', (req: Request, res: Response) => {
  res.status(200).json({ success: true })
})

router.get('/readyz', (req: Request, res: Response) => {
  // Checks if server is ready can go here
  const someCheck = true
  if (someCheck) {
    res.status(200).json({ success: true })
  } else {
    res.status(500).json({ success: false })
  }
})

export default router
