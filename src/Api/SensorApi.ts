import { type Request, type Response } from "express";
import Router from "express-promise-router";
import saveToJson from "../Shared/saveToJson";
import readFromJson from "../Shared/readFromJson";
import isEmpty from "../Shared/isEmpty";
import fs from "fs";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  console.log("[DEBUG] POST on /");

  if (isEmpty(req.body.name) || isEmpty(req.body.data)) {
    return res.status(400).json({
      status: 400,
      message: "Missing required property: 'name' or 'data'",
    });
  }

  saveToJson(`trashcan-${req.body.name}`, req.body.data);
  res.status(200).end();
});

router.get("/", (req: Request, res: Response) => {
  console.log("[DEBUG] GET on /");
  const jsonFiles: object[] = [];
  if (fs.existsSync("../../database")) {
    console.log("it exists");
    for (const file in fs.readdirSync(`../../database`)) {
      const jsonData = readFromJson(file);
      jsonFiles.push(jsonData);
    }
  } else {
    console.log("it dont exist");
  }
  res.status(200).json(jsonFiles);
});

router.get("/:trashcanName", (req: Request, res: Response) => {
  console.log("[DEBUG] GET on /:trashcanName");
  const jsonData = readFromJson(`trashcan-${req.params.trashcanName}.json`);
  res.status(200).json(jsonData);
});

export default router;
