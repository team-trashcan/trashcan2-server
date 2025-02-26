import fs from "fs";
import config from "../config";
import { sensorData } from "../interface";

export default function readFromJson(fileName: string): sensorData | undefined {
  try {
    const rawData = fs.readFileSync(`${config.filePath}/${fileName}`, "utf8");
    return JSON.parse(rawData);
  } catch (error: any) {
    if (error.code === "ENOENT") {
      console.log("[DEBUG]: No file found with name:", fileName);
      return;
    }
    console.error("Error reading data:", error);
    return;
  }
}
