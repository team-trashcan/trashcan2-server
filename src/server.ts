import config from "./config";
import app from "./app";
import saveToJson from "./Shared/saveToJson";

const server = async (): Promise<void> => {
  console.log("[DEBUG] testing file saving");
  saveToJson("test", { someData: "someValue" });
  app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
  });
};

server().catch((error: Error) => {
  setTimeout(server, 5000);
  console.log(error);
});
