import config from "config";

export interface AppConfig {
  logLevel: string;
  port: number;
}

const appConfig = config.get<AppConfig>("app");
export default appConfig;
