import fs from "fs";
import config from "../config";

export default function saveToJson(fileName: string, data: any): void {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(`${config.filePath}/${fileName}`, jsonData, "utf8");
    console.log("[DEBUG] Data successfully saved to", config.filePath);
  } catch (error) {
    console.error("[DEBUG] Error saving data:", error);
  }
}
