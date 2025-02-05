import { type Request, type Response } from "express";
import Router from "express-promise-router";
import saveToJson from "../Shared/saveToJson";
import readFromJson from "../Shared/readFromJson";
import isEmpty from "../Shared/isEmpty";
import fs from "fs";
import path from "path";

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
  return res.status(200).end();
});

router.get("/", (req: Request, res: Response) => {
  console.log("[DEBUG] GET on /");
  const jsonFiles: object[] = [];
  for (const file of fs.readdirSync(
    `${path.resolve(__dirname, "../../database")}`
  )) {
    const jsonData = readFromJson(file);

    console.log("file:", file);
    const test1 = file.split("/");
    console.log("test1:", test1);

    const test2 = test1[-1];
    console.log("test2:", test2);

    const test3 = test2.replace(".json", "");
    console.log("test3:", test3);

    jsonFiles.push({
      name: test3,
      data: jsonData,
    });
  }
  return res.status(200).json(jsonFiles);
});

router.get("/:trashcanName", (req: Request, res: Response) => {
  console.log("[DEBUG] GET on /:trashcanName");
  const jsonData = readFromJson(`trashcan-${req.params.trashcanName}.json`);
  if (Object.keys(jsonData).length === 0) {
    return res.status(404).json({
      status: 400,
      message: `No data for trashcan-${req.params.trashcanName}.json`,
    });
  }
  return res.status(200).json(jsonData);
});

export default router;
