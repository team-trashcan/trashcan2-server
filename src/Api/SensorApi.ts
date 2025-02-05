import { type Request, type Response } from "express";
import Router from "express-promise-router";
import saveToJson from "../Shared/saveToJson";
import readFromJson from "../Shared/readFromJson";
import isEmpty from "../Shared/isEmpty";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  console.log("[DEBUG] POST on /update-sensor");
  console.log("[DEBUG] req.body received from trashcan: ", req.body);

  if (isEmpty(req.body.name) || isEmpty(req.body.data)) {
    return res.status(400).json({
      status: 400,
      message: "Missing required property: 'name' or 'data'",
    });
  }

  saveToJson(`trashcan-${req.body.name}`, req.body.data);

  // debug
  const test = readFromJson(`trashcan-${req.body.name}`);
  console.log("[DEBUG] Stuff saved in file:", test);

  res.status(200).end();
});

router.get("/", (req: Request, res: Response) => {
  console.log("[DEBUG] GET on /update-sensor");
  const jsonData = readFromJson(`trashcan-${req.body.name}`);
  console.log("[DEBUG] returning jsonData:", jsonData);
  res.status(200).json(jsonData);
});

export default router;
