import { type Request, type Response } from "express";
import Router from "express-promise-router";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ success: true });
});

router.post("/echo", (req: Request, res: Response) => {
  res.status(200).json({ received: req.body });
});

export default router;
