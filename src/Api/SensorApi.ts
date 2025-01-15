import { type Request, type Response } from "express";
import Router from "express-promise-router";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  console.log("Stuff from trashcan: ", req.body);
  res.status(200).end();
});

export default router;
