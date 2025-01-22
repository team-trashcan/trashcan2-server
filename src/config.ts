import config from "config";

export interface AppConfig {
  logLevel: string;
  port: number;
  filePath: string;
}

const appConfig = config.get<AppConfig>("app");
export default appConfig;
