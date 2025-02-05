import fs from "fs";
import config from "../config";

export default function readFromJson(fileName: string) {
  try {
    const rawData = fs.readFileSync(`${config.filePath}/${fileName}`, "utf8");
    return JSON.parse(rawData);
  } catch (error) {
    console.error("[DEBUG] Error reading data:", error);
    return {};
  }
}
