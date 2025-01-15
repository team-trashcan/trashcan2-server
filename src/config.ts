import config from "config";

export interface AppConfig {
  logLevel: string;
  port: number;
  baseUrl: string;
}

const appConfig = config.get<AppConfig>("app");
export default appConfig;
