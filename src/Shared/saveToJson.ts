import fs from "fs";
import config from "../config";

export default function saveToJson(fileName: string, data: any): void {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(
      `${config.filePath}/${
        /\.json$/.test(fileName) ? fileName : `${fileName}.json`
      }`,
      jsonData,
      "utf8"
    );
  } catch (error) {
    console.error("Error saving data to json file:", error);
  }
}
