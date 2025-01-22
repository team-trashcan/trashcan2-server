import { type Request, type Response } from "express";
import Router from "express-promise-router";
import saveToJson from "../Shared/saveToJson";
import readFromJson from "../Shared/readFromJson";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  console.log("[DEBUG] req.body received from trashcan: ", req.body);
  saveToJson(`trashcan-${req.body.name}`, req.body.data);
  const test = readFromJson(`trashcan-${req.body.name}`);
  console.log("[DEBUG] Stuff saved in file:", test);
  res.status(200).end();
});

export default router;
