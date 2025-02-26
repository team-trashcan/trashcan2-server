import { type Request, type Response } from "express";
import Router from "express-promise-router";
import saveToJson from "../Shared/saveToJson";
import readFromJson from "../Shared/readFromJson";
import isEmpty from "../Shared/isEmpty";
import fs from "fs";
import path from "path";
import { sensorData, sensorDataPercentage } from "src/interface";
import mapTrashcanPercentage from "src/Shared/mapTrashcanPercentage";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  if (isEmpty(req.body.name) || isEmpty(req.body.data)) {
    return res.status(400).json({
      status: 400,
      message: "Missing required property: 'name' or 'data'",
    });
  }
  if (isNaN(Number(req.body.data))) {
    return res.status(400).json({
      status: 400,
      message: "Property 'data' needs to be a valid number",
    });
  }

  saveToJson(`trashcan-${req.body.name}`, req.body);
  return res.status(200).end();
});

router.get("/", (req: Request, res: Response) => {
  const jsonFiles: sensorData[] = [];
  for (const file of fs.readdirSync(
    `${path.resolve(__dirname, "../../database")}`
  )) {
    const jsonData = readFromJson(file);
    if (jsonData !== undefined) {
      jsonFiles.push(jsonData);
    }
  }
  return res.status(200).json(jsonFiles);
});

router.get("/:trashcanName", (req: Request, res: Response) => {
  const jsonData = readFromJson(`trashcan-${req.params.trashcanName}.json`);
  if (jsonData === undefined) {
    return res.status(404).json({
      status: 400,
      message: `No data for trashcan-${req.params.trashcanName}.json`,
    });
  }
  return res.status(200).json(jsonData);
});

router.get("/percentage", (req: Request, res: Response) => {
  const jsonFiles: sensorDataPercentage[] = [];
  for (const file of fs.readdirSync(
    `${path.resolve(__dirname, "../../database")}`
  )) {
    const jsonData = readFromJson(file);
    if (jsonData !== undefined) {
      jsonFiles.push({name: jsonData.name, percentage: mapTrashcanPercentage(jsonData.data)});
    }
  }
  return res.status(200).json(jsonFiles);
});

router.get("/percentage/:trashcanName", (req: Request, res: Response) => {
  const jsonData = readFromJson(`trashcan-${req.params.trashcanName}.json`);
  if (jsonData === undefined) {
    return res.status(404).json({
      status: 400,
      message: `No data for trashcan-${req.params.trashcanName}.json`,
    });
  }
  return res.status(200).json({
    name: jsonData.name,
    percentage: mapTrashcanPercentage(jsonData.data)
  });
});

export default router;
